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

export const VideoScrubberCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let viewW = window.innerWidth;
    let viewH = window.innerHeight;
    let targetProgress = 0;
    let currentProgress = 0;
    let lastDrawnProgress = -1;
    let rafId: number | null = null;
    let needsRedraw = true;

    const updateCanvasSize = (force = false) => {
      const nextW = window.innerWidth;
      const nextH = window.innerHeight;
      // Avoid canvas clear/flicker on mobile when only the browser URL bar hides/shows
      if (
        !force &&
        nextW === viewW &&
        nextW < 768 &&
        Math.abs(nextH - viewH) < 140
      ) {
        return;
      }
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
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
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        window.innerHeight * 2
      );
      const totalScrollable = docHeight - window.innerHeight;
      const currentScroll = window.scrollY || window.pageYOffset || 0;
      return totalScrollable > 0
        ? Math.max(0, Math.min(1, currentScroll / totalScrollable))
        : 0;
    };

    const drawFrame = (progress: number) => {
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;

      const imgProgress = Math.max(0, Math.min(1, (progress - 0.04) / 0.96));
      const exactFrame = imgProgress * (TOTAL_IMAGE_FRAMES - 1);
      const currIdx = Math.min(TOTAL_IMAGE_FRAMES - 1, Math.max(0, Math.floor(exactFrame)));
      const nextIdx = Math.min(TOTAL_IMAGE_FRAMES - 1, currIdx + 1);
      const factor = exactFrame - currIdx;

      const entry1 = getValidFrame(currIdx);
      const entry2 = getValidFrame(nextIdx);

      const transitionStart = 0.82;

      if (factor < transitionStart || currIdx === nextIdx || !entry2) {
        if (entry1) {
          drawCover(ctx, entry1, viewW, viewH, 1.0);
        } else {
          ctx.fillStyle = '#fbf4f6';
          ctx.fillRect(0, 0, viewW, viewH);
        }
      } else {
        const fadeProgress = (factor - transitionStart) / (1.0 - transitionStart);
        if (entry1) {
          drawCover(ctx, entry1, viewW, viewH, 1.0);
        }
        if (entry2) {
          drawCover(ctx, entry2, viewW, viewH, fadeProgress);
        }
      }

      ctx.restore();
    };

    const tick = () => {
      rafId = null;
      const diff = targetProgress - currentProgress;

      if (Math.abs(diff) > 0.0002) {
        // Smooth exponential damping for silky wheel/trackpad scrolling
        currentProgress += diff * 0.28;
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

      if (Math.abs(targetProgress - currentProgress) > 0.0002) {
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

    // Preload frame_02 immediately and defer remaining frames by 1.2s so opening video gets 100% network priority
    if (!preloadStarted) {
      preloadStarted = true;
      const loadFrame = (i: number) => {
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
                needsRedraw = true;
                scheduleTick();
              })
              .catch(() => {
                cachedFrames[idx] = {
                  source: loadedImg,
                  width: dims.width,
                  height: dims.height,
                };
                needsRedraw = true;
                scheduleTick();
              });
          } else {
            cachedFrames[idx] = {
              source: loadedImg,
              width: dims.width,
              height: dims.height,
            };
            needsRedraw = true;
            scheduleTick();
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

      loadFrame(2);
      window.setTimeout(() => {
        for (let i = 3; i <= 12; i++) {
          loadFrame(i);
        }
      }, 1200);
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

function drawCover(
  ctx: CanvasRenderingContext2D,
  entry: FrameEntry,
  w: number,
  h: number,
  alpha: number
) {
  if (!entry.source) return;
  ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

  const imgRatio = entry.width / (entry.height || 1);
  const screenRatio = w / h;

  let renderW = w;
  let renderH = h;

  if (screenRatio > imgRatio) {
    renderH = w / imgRatio;
  } else {
    renderW = h * imgRatio;
  }

  const x = (w - renderW) / 2;
  const y = (h - renderH) / 2;

  ctx.drawImage(entry.source, x, y, renderW, renderH);
}
