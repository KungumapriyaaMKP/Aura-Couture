import React from 'react';
import { PRODUCTS, formatCouturePrice } from '../../data/products';
import { useCartStore } from '../../store/useCartStore';
import { audioEngine } from '../../utils/sound';

export const QuickCatalogView: React.FC = () => {
  const { isCatalogOpen, toggleCatalog, openProductModal, setFocusTarget, currency } = useCartStore();

  if (!isCatalogOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#3b121e]/25 backdrop-blur-md animate-fade-in pointer-events-auto">
      <div className="relative w-full max-w-6xl h-[90vh] sm:h-[86vh] glass-panel-dark rounded-none p-4 sm:p-6 md:p-8 border-2 border-[#e8c3cd] shadow-2xl flex flex-col justify-between overflow-hidden bg-[#fffafc]">
        <div className="flex items-center justify-between pb-3.5 sm:pb-4 border-b border-[#e8c3cd]/60 shrink-0 gap-3">
          <div>
            <span className="font-nav text-[8px] sm:text-[9px] tracking-[0.24em] sm:tracking-[0.28em] text-[#a02e46] uppercase block mb-0.5 sm:mb-1">
              COLLECTION ARCHIVE
            </span>
            <h2 className="font-aura-display text-xl sm:text-2xl md:text-3xl font-medium text-[#3b121e] tracking-[0.06em] sm:tracking-[0.08em] uppercase">
              RUNWAY CATALOGUE
            </h2>
          </div>
          <button
            onClick={() => {
              audioEngine.playHotspotClickSound();
              toggleCatalog();
            }}
            className="px-3 sm:px-4 py-1.5 sm:py-2 border border-[#e8c3cd] font-nav text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.24em] uppercase text-[#3b121e] hover:bg-[#fce4ec] transition-colors cursor-pointer shrink-0"
          >
            CLOSE
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 sm:py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pr-1">
          {PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              onClick={() => {
                audioEngine.playHotspotClickSound();
                setFocusTarget(prod.position3D);
                toggleCatalog();
                openProductModal(prod);
              }}
              className="group relative glass-panel rounded-none overflow-hidden border border-[#e8c3cd] hover:border-[#f09bb5] transition-all duration-500 cursor-pointer flex flex-col justify-between bg-white hover:-translate-y-1 hover:shadow-[0_0_26px_rgba(244,143,177,0.65),0_0_55px_rgba(160,46,70,0.28)]"
            >
              <div className="relative h-64 w-full shrink-0 overflow-hidden bg-[#fbf4f6] border-b border-[#e8c3cd]/50">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                />
                {/* Soft Rose-Pearl Luminescence Overlay on Hover */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,240,246,0.34),rgba(232,160,180,0.12)_55%,transparent_80%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Diagonal Silk Light Sheen Sweep on Hover */}
                <div className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-12 group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
              </div>

              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <span className="font-nav text-[8px] tracking-[0.22em] text-[#a02e46] uppercase block mb-1">
                    {prod.category}
                  </span>
                  <h3 className="font-aura-display text-xl font-medium text-[#3b121e] group-hover:text-[#a02e46] transition-colors mb-1.5">
                    {prod.name}
                  </h3>
                  <p className="font-body-editorial text-xs text-[#581c2b]/85 line-clamp-2 mb-4 leading-relaxed">
                    {prod.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#e8c3cd]/50">
                  <span className="font-aura-display font-medium text-lg tracking-[0.05em] text-[#a02e46]">
                    {formatCouturePrice(prod.price, currency)}
                  </span>
                  <span className="font-nav text-[9px] uppercase tracking-[0.22em] text-[#4a121e] group-hover:text-[#a02e46] transition-colors">
                    VIEW PIECE
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
