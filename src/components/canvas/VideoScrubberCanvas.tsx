import React, { useEffect, useRef } from 'react';

const TOTAL_IMAGE_FRAMES = 11; // frame_02.webp to frame_12.webp

type DrawableSource = ImageBitmap | HTMLImageElement;

interface FrameEntry {
  source: DrawableSource | null;
  width: number;
  height: number;
}

// Module-level cache so frames remain in GPU/memory across page navigation
const cachedFrames: FrameEntry[] = Array.from({ length: TOTAL_IMAGE_FRAMES }, () => ({
  source: null,
  width: 0,
  height: 0,
}));
let preloadStarted = false;

function getFrameDimensions(src: DrawableSource): { width: number; height: number } {
  if ('naturalWidth' in src) {
    return { width: src.naturalWidth, height: src.naturalHeight };
  }
  return { width: src.width, height: src.height };
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export const VideoScrubberCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2.25);
    let viewW = window.innerWidth;
    let viewH = window.innerHeight;
    let totalScrollable = 1;
    let targetProgress = 0;
    let currentProgress = 0;
    let lastDrawnProgress = -1;
    let rafId: number | null = null;
    let needsRedraw = true;

    const updateScrollableHeight = () => {
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        window.innerHeight * 2
      );
      totalScrollable = Math.max(1, docHeight - window.innerHeight);
    };

    const updateCanvasSize = (force = false) => {
      const nextW = window.innerWidth;
      const nextH = window.innerHeight;
      updateScrollableHeight();

      // Avoid canvas clear/flicker on mobile when only the browser URL bar hides/shows
      if (
        !force &&
        nextW === viewW &&
        nextW < 768 &&
        Math.abs(nextH - viewH) < 140
      ) {
        return;
      }

      dpr = Math.min(window.devicePixelRatio || 1, 2.25);
      viewW = nextW;
      viewH = nextH;
      const targetW = Math.floor(viewW * dpr);
      const targetH = Math.floor(viewH * dpr);
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }
      needsRedraw = true;
    };

    const getScrollProgress = () => {
      if (totalScrollable <= 100) {
        updateScrollableHeight();
      }
      const currentScroll = window.scrollY || window.pageYOffset || 0;
      return totalScrollable > 0
        ? Math.max(0, Math.min(1, currentScroll / totalScrollable))
        : 0;
    };

    const drawFrame = (progress: number) => {
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      const imgProgress = Math.max(0, Math.min(1, (progress - 0.04) / 0.96));
      const exactFrame = imgProgress * (TOTAL_IMAGE_FRAMES - 1);
      const currIdx = Math.min(TOTAL_IMAGE_FRAMES - 1, Math.max(0, Math.floor(exactFrame)));
      const nextIdx = Math.min(TOTAL_IMAGE_FRAMES - 1, currIdx + 1);
      const factor = exactFrame - currIdx;

      const entry1 = getValidFrame(currIdx);
      const entry2 = getValidFrame(nextIdx);

      const transitionStart = 0.72;
      const pan1 = Math.min(1, factor / 0.85);
      const pan2 = Math.max(0, (factor - transitionStart) / (1 - transitionStart)) * 0.22;

      if (!entry1) {
        ctx.fillStyle = '#fbf4f6';
        ctx.fillRect(0, 0, viewW, viewH);
        ctx.restore();
        return;
      }

      if (factor < transitionStart || currIdx === nextIdx || !entry2) {
        drawSceneFrame(ctx, entry1, viewW, viewH, 1.0, pan1);
      } else {
        const fadeProgress = smoothstep(transitionStart, 1.0, factor);
        drawSceneFrame(ctx, entry1, viewW, viewH, 1.0, pan1);
        drawSceneFrame(ctx, entry2, viewW, viewH, fadeProgress, pan2);
      }

      ctx.restore();
    };

    const tick = () => {
      rafId = null;
      const diff = targetProgress - currentProgress;
      const isMobile = viewW < 768;
      const damping = isMobile ? 0.42 : 0.28;

      if (Math.abs(diff) > 0.00015) {
        currentProgress += diff * damping;
        needsRedraw = true;
      } else if (currentProgress !== targetProgress) {
        currentProgress = targetProgress;
        needsRedraw = true;
      }

      if (needsRedraw || Math.abs(currentProgress - lastDrawnProgress) > 0.0001) {
        drawFrame(currentProgress);
        lastDrawnProgress = currentProgress;
        needsRedraw = false;
      }

      if (Math.abs(targetProgress - currentProgress) > 0.00015) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const scheduleTick = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const handleScroll = () => {
      targetProgress = getScrollProgress();
      scheduleTick();
    };

    const handleResize = () => {
      updateCanvasSize(false);
      targetProgress = getScrollProgress();
      scheduleTick();
    };

    // Preload frame_02 and frame_03 immediately, then load 04..12 with 2 parallel workers
    // so all frames are ready in GPU memory before the user scrolls past the opening video
    if (!preloadStarted) {
      preloadStarted = true;
      let nextFrameNum = 4;

      const loadSingleFrame = (i: number, onDone?: () => void) => {
        if (i > 12) return;
        const idx = i - 2;
        const numStr = i.toString().padStart(2, '0');
        const img = new Image();
        img.decoding = 'async';
        img.src = `/frames/frame_${numStr}.webp`;

        const finalizeImage = (loadedImg: HTMLImageElement) => {
          const dims = getFrameDimensions(loadedImg);
          if (typeof createImageBitmap === 'function') {
            createImageBitmap(loadedImg)
              .then((bitmap) => {
                cachedFrames[idx] = {
                  source: bitmap,
                  width: bitmap.width,
                  height: bitmap.height,
                };
                if (idx <= 1 || currentProgress > 0.02) {
                  needsRedraw = true;
                  scheduleTick();
                }
                onDone?.();
              })
              .catch(() => {
                cachedFrames[idx] = {
                  source: loadedImg,
                  width: dims.width,
                  height: dims.height,
                };
                if (idx <= 1 || currentProgress > 0.02) {
                  needsRedraw = true;
                  scheduleTick();
                }
                onDone?.();
              });
          } else {
            cachedFrames[idx] = {
              source: loadedImg,
              width: dims.width,
              height: dims.height,
            };
            if (idx <= 1 || currentProgress > 0.02) {
              needsRedraw = true;
              scheduleTick();
            }
            onDone?.();
          }
        };

        img.onload = () => {
          if ('decode' in img) {
            img
              .decode()
              .then(() => finalizeImage(img))
              .catch(() => finalizeImage(img));
          } else {
            finalizeImage(img);
          }
        };

        img.onerror = () => {
          img.src = `/frames/frame_${numStr}.jpg`;
        };
      };

      const runWorker = () => {
        if (nextFrameNum > 12) return;
        const current = nextFrameNum++;
        loadSingleFrame(current, runWorker);
      };

      loadSingleFrame(2, () => {
        loadSingleFrame(3, () => {
          // Launch 2 concurrent workers for frames 04..12
          runWorker();
          runWorker();
        });
      });
    }

    updateCanvasSize(true);
    targetProgress = getScrollProgress();
    currentProgress = targetProgress;
    scheduleTick();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
    />
  );
};

function getValidFrame(idx: number): FrameEntry | null {
  if (cachedFrames[idx]?.source && cachedFrames[idx].width > 0) {
    return cachedFrames[idx];
  }
  for (let i = idx; i >= 0; i--) {
    if (cachedFrames[i]?.source && cachedFrames[i].width > 0) return cachedFrames[i];
  }
  for (let i = idx + 1; i < cachedFrames.length; i++) {
    if (cachedFrames[i]?.source && cachedFrames[i].width > 0) return cachedFrames[i];
  }
  return null;
}

function drawSceneFrame(
  ctx: CanvasRenderingContext2D,
  entry: FrameEntry,
  w: number,
  h: number,
  alpha: number,
  panProgress: number
) {
  if (!entry.source) return;
  ctx.save();
  ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

  // Crop the top 7.2% of source frames where a static desktop navbar was baked into the artwork
  const srcX = 0;
  const srcY = Math.round(entry.height * 0.072);
  const srcW = entry.width;
  const srcH = Math.max(1, entry.height - srcY);
  const imgRatio = srcW / srcH;

  const isPortraitMobile = w < 768 && h > w * 1.08;

  if (!isPortraitMobile) {
    // Desktop / Landscape: full-screen cover with subtle continuous dolly zoom (1.0 -> 1.032)
    const headerOffset = w >= 768 ? 72 : 56;
    const availH = Math.max(1, h - headerOffset);
    const screenRatio = w / availH;

    let baseW = w;
    let baseH = availH;

    if (screenRatio > imgRatio) {
      baseH = w / imgRatio;
    } else {
      baseW = availH * imgRatio;
    }

    const zoom = 1 + panProgress * 0.032;
    const renderW = baseW * zoom;
    const renderH = baseH * zoom;
    const x = (w - renderW) / 2;
    const y = headerOffset + (availH - renderH) / 2;

    if (alpha >= 0.99) {
      ctx.fillStyle = '#fbf4f6';
      ctx.fillRect(0, 0, w, headerOffset);
    }

    ctx.drawImage(entry.source, srcX, srcY, srcW, srcH, x, y, renderW, renderH);
    ctx.restore();
    return;
  }

  // Mobile Portrait:
  // 1. Ambient soft couture backdrop so top & bottom blend seamlessly without cropping 75% of the scene
  ctx.fillStyle = '#fbf4f6';
  ctx.fillRect(0, 0, w, h);

  const bgH = h;
  const bgW = bgH * imgRatio;
  const bgX = (w - bgW) * (0.2 + panProgress * 0.6);
  ctx.save();
  ctx.globalAlpha = Math.max(0, Math.min(1, alpha)) * 0.22;
  ctx.drawImage(entry.source, srcX, srcY, srcW, srcH, bgX, 0, bgW, bgH);
  ctx.restore();

  // Warm rose-ivory atmospheric wash over ambient background
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, 'rgba(251, 244, 246, 0.92)');
  grad.addColorStop(0.18, 'rgba(251, 244, 246, 0.45)');
  grad.addColorStop(0.82, 'rgba(251, 244, 246, 0.45)');
  grad.addColorStop(1, 'rgba(251, 244, 246, 0.94)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // 2. Main crystal-clear viewport showcase with smooth horizontal camera pan across the full 16:9 scene
  // so both the left editorial headlines (02/12 .. 12/12) and right couture mannequins are 100% visible
  const headerH = 56;
  const availH = h - headerH;
  const cardH = Math.min(availH * 0.74, w * 1.16);
  const cardY = headerH + (availH - cardH) * 0.46;
  const renderW = cardH * imgRatio;

  const easedPan = smoothstep(0.0, 1.0, panProgress);
  const maxPanX = Math.max(0, renderW - w);
  const x = -maxPanX * (0.04 + easedPan * 0.92);

  // Soft shadow and champagne hairline frame around the main showcase
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, cardY, w, cardH);
  ctx.clip();
  ctx.drawImage(entry.source, srcX, srcY, srcW, srcH, x, cardY, renderW, cardH);
  ctx.restore();

  ctx.strokeStyle = 'rgba(160, 46, 70, 0.24)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, cardY);
  ctx.lineTo(w, cardY);
  ctx.moveTo(0, cardY + cardH);
  ctx.lineTo(w, cardY + cardH);
  ctx.stroke();

  ctx.restore();
}
