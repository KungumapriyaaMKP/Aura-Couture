import React from 'react';
import { useCartStore } from '../../store/useCartStore';

export const ChapterIndicators: React.FC = () => {
  const scrollProgress = useCartStore((s) => s.scrollProgress);

  const isEndChapter = scrollProgress >= 0.86;
  const opacity = Math.max(0, Math.min(1, (scrollProgress - 0.86) * 7.5));

  if (!isEndChapter) return null;

  return (
    <div
      className="fixed bottom-6 inset-x-0 z-30 flex justify-center px-4 pointer-events-none transition-all duration-500 select-none"
      style={{
        opacity,
        transform: `translateY(${(1 - opacity) * 20}px)`,
      }}
    >
      <div className="pointer-events-auto max-w-md w-full glass-panel px-6 py-4 rounded-none border border-[#e8c3cd] shadow-2xl flex items-center justify-between gap-6 bg-white/95 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <img
            src="/sumya_logo.png"
            alt="Sumya Web Studio"
            className="w-9 h-9 object-cover border border-[#a02e46]/40 shrink-0"
          />
          <div className="text-left">
            <span className="font-nav text-[9px] tracking-[0.25em] text-[#a02e46] block uppercase">
              Digital Flagship Crafted By
            </span>
            <span className="font-aura-display text-sm text-[#3b121e]">
              Sumya Web Studio
            </span>
          </div>
        </div>
        <a
          href="https://sumyawebstudio.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-nav text-[9px] tracking-[0.2em] text-[#801c30] hover:text-[#a02e46] uppercase underline whitespace-nowrap"
        >
          VISIT STUDIO
        </a>
      </div>
    </div>
  );
};
