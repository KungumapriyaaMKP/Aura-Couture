import React from 'react';

export const StudioFooter: React.FC = () => {
  return (
    <footer className="mt-12 sm:mt-16 pt-6 border-t border-[#e8c3cd] max-w-md mx-auto flex items-center justify-between gap-3 sm:gap-6">
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        <img
          src="/sumya_logo.png"
          alt="Sumya Web Studio"
          className="w-8 h-8 sm:w-9 sm:h-9 object-cover border border-[#a02e46]/40 shrink-0"
        />
        <div className="text-left min-w-0">
          <span className="font-nav text-[8px] sm:text-[9px] tracking-[0.18em] sm:tracking-[0.25em] text-[#a02e46] block uppercase truncate">
            Digital Flagship Crafted By
          </span>
          <span className="font-aura-display text-xs sm:text-sm text-[#3b121e] block truncate">
            Sumya Web Studio
          </span>
        </div>
      </div>
      <a
        href="https://sumyawebstudio.netlify.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-nav text-[8px] sm:text-[9px] tracking-[0.18em] sm:tracking-[0.2em] text-[#801c30] hover:text-[#a02e46] uppercase underline whitespace-nowrap shrink-0"
      >
        VISIT STUDIO
      </a>
    </footer>
  );
};
