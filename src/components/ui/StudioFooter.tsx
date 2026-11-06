import React from 'react';

export const StudioFooter: React.FC = () => {
  return (
    <footer className="mt-16 pt-6 border-t border-[#e8c3cd] max-w-md mx-auto flex items-center justify-between gap-6">
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
    </footer>
  );
};
