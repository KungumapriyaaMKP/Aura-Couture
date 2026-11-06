import React, { useEffect, useRef } from 'react';
import { audioEngine } from '../../utils/sound';
import { ChevronDown } from 'lucide-react';
import { AuraCoutureVectorLogo } from './AuraCoutureVectorLogo';

export const VideoOpeningScreen: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasFinishedRef = useRef<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    const startPlay = () => {
      if (!hasFinishedRef.current) {
        video.play().catch(() => {});
      }
    };

    const handleEnded = () => {
      hasFinishedRef.current = true;
      video.pause();
    };

    video.addEventListener('canplay', startPlay, { once: true });
    video.addEventListener('ended', handleEnded);
    startPlay();

    const handleFirstClick = () => {
      if (!hasFinishedRef.current && video.paused && !video.ended) {
        video.play().catch(() => {});
      }
    };
    window.addEventListener('click', handleFirstClick, { once: true });
    window.addEventListener('touchstart', handleFirstClick, { once: true, passive: true });

    const handleScroll = () => {
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        window.innerHeight * 2
      );
      const totalScrollable = docHeight - window.innerHeight;
      const currentScroll = window.scrollY || window.pageYOffset || 0;
      const progress = totalScrollable > 0 ? currentScroll / totalScrollable : 0;

      const el = containerRef.current;
      if (el) {
        // Visible at the start (progress 0), cleanly hidden once scrolled into Chapter 02 (progress >= 0.06)
        const opacity = Math.max(0, 1 - progress * 18);
        el.style.opacity = String(opacity);
        el.style.pointerEvents = opacity > 0.05 ? 'auto' : 'none';
        el.style.visibility = opacity <= 0.01 ? 'hidden' : 'visible';
      }

      if (progress >= 0.06 && !video.paused) {
        video.pause();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      video.removeEventListener('canplay', startPlay);
      video.removeEventListener('ended', handleEnded);
      window.removeEventListener('click', handleFirstClick);
      window.removeEventListener('touchstart', handleFirstClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToBoutique = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioEngine.playDoorOpenSound();
    const docHeight = document.body.scrollHeight - window.innerHeight;
    window.scrollTo({ top: docHeight * 0.08, behavior: 'smooth' });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-10 flex flex-col justify-between p-4 sm:p-6 md:p-10 select-none overflow-hidden bg-[#fbf4f6]"
      style={{
        opacity: 1,
        willChange: 'opacity',
      }}
    >
      <video
        ref={videoRef}
        src="/catwalk_opening.mp4"
        muted={true}
        playsInline
        autoPlay
        loop={false}
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-top z-0 video-native-hd"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#fbf4f6]/45 via-transparent to-[#fbf4f6]/30 z-1 pointer-events-none" />

      <div className="absolute left-4 sm:left-6 md:left-14 top-[45%] sm:top-[48%] -translate-y-1/2 z-10 pointer-events-none transition-transform duration-500 hover:scale-105">
        <AuraCoutureVectorLogo className="w-[215px] sm:w-[320px] md:w-[380px] lg:w-[420px] max-w-[78vw] h-auto drop-shadow-sm" />
      </div>

      <button
        onClick={handleScrollToBoutique}
        className="absolute left-4 sm:left-6 md:left-14 bottom-8 sm:bottom-10 md:bottom-16 z-20 flex items-center gap-2.5 sm:gap-3.5 cursor-pointer group pointer-events-auto border-b border-[#a02e46] pb-1.5"
        title="Scroll Down to Explore"
      >
        <span className="font-nav text-[9px] sm:text-[10px] md:text-xs tracking-[0.22em] sm:tracking-[0.38em] text-[#a02e46] font-bold uppercase group-hover:text-[#801c30] transition-colors">
          SCROLL TO ENTER COUTURE
        </span>
        <span className="flex flex-col items-center -space-y-2.5 text-[#a02e46] group-hover:text-[#801c30]">
          <ChevronDown className="w-3.5 h-3.5 animate-bounce opacity-60" style={{ animationDelay: '0ms' }} />
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" style={{ animationDelay: '150ms' }} />
        </span>
      </button>
    </div>
  );
};
