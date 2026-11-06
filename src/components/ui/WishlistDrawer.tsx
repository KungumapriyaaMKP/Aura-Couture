import React from 'react';
import { useCartStore } from '../../store/useCartStore';
import { PRODUCTS, formatCouturePrice, type Product } from '../../data/products';
import { audioEngine } from '../../utils/sound';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    toggleWishlistDrawer,
    toggleWishlist,
    addToCart,
    openProductModal,
    setActivePage,
    currency,
  } = useCartStore();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleMoveToBag = (product: Product) => {
    audioEngine.playChimeSound();
    toggleWishlist(product.id);
    toggleWishlistDrawer();
    addToCart(
      product,
      product.sizes[0] || 'EU 38 / US 4',
      product.colors[0] || { name: 'Royal Crimson', hex: '#8b0000' }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#3b121e]/25 backdrop-blur-sm animate-fade-in pointer-events-auto select-none">
      <div className="w-full max-w-md h-full glass-panel-dark border-l-2 border-[#e8c3cd] flex flex-col justify-between p-4 sm:p-6 shadow-2xl overflow-hidden bg-[#fffafc]">
        <div className="flex items-center justify-between pb-4 border-b border-[#e8c3cd]/60">
          <div>
            <span className="font-nav text-[9px] tracking-[0.26em] text-[#a02e46] uppercase block mb-0.5">
              PRIVATE SELECTION
            </span>
            <h3 className="font-aura-display text-lg sm:text-xl font-medium text-[#3b121e] tracking-[0.08em] uppercase">
              WISHLIST ({wishlistedProducts.length})
            </h3>
          </div>
          <button
            onClick={() => {
              audioEngine.playHotspotClickSound();
              toggleWishlistDrawer();
            }}
            className="px-3 py-1.5 border border-[#e8c3cd] font-nav text-[9px] tracking-[0.22em] uppercase text-[#3b121e] hover:bg-[#fce4ec] transition-colors cursor-pointer"
          >
            CLOSE
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-3.5 sm:space-y-4">
          {wishlistedProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <p className="font-aura-display text-xl text-[#3b121e] font-medium mb-2">
                Your wishlist is currently empty
              </p>
              <p className="text-xs text-[#8a2b53] max-w-xs font-medium leading-relaxed mb-6">
                If a creation captures your interest while exploring our boutique or seasonal lookbooks, select Save to curate your personal shortlist here.
              </p>
              <button
                onClick={() => {
                  audioEngine.playChimeSound();
                  toggleWishlistDrawer();
                  setActivePage('shop');
                }}
                className="px-6 py-3 bg-[#a02e46] hover:bg-[#801c30] text-white font-nav text-[10px] tracking-[0.24em] uppercase transition-colors cursor-pointer"
              >
                EXPLORE SHOP
              </button>
            </div>
          ) : (
            wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="glass-panel p-3 sm:p-4 rounded-none flex gap-3 sm:gap-4 border border-[#e8c3cd] items-center bg-white"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  onClick={() => {
                    toggleWishlistDrawer();
                    openProductModal(product);
                  }}
                  className="w-16 h-24 object-cover rounded-none border border-[#f8bbd0]/50 shrink-0 cursor-pointer"
                />
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <span className="font-nav text-[8px] tracking-[0.2em] text-[#a02e46] uppercase block">
                      {product.category}
                    </span>
                    <h4
                      onClick={() => {
                        toggleWishlistDrawer();
                        openProductModal(product);
                      }}
                      className="text-sm font-serif font-black text-[#3b121e] hover:text-[#a02e46] transition-colors truncate cursor-pointer mb-1"
                    >
                      {product.name}
                    </h4>
                    <span className="text-xs font-black text-[#a02e46] block">
                      {formatCouturePrice(product.price, currency)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#e8c3cd]/40">
                    <button
                      onClick={() => handleMoveToBag(product)}
                      className="px-3 py-1 bg-[#a02e46] hover:bg-[#801c30] text-white font-nav text-[8px] tracking-[0.2em] uppercase transition-colors cursor-pointer"
                    >
                      MOVE TO BAG
                    </button>

                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="font-nav text-[9px] tracking-[0.18em] uppercase text-gray-400 hover:text-[#a02e46] transition-colors cursor-pointer"
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
