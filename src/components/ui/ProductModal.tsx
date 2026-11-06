import React, { useState } from 'react';
import { useCartStore } from '../../store/useCartStore';
import { formatCouturePrice } from '../../data/products';
import { audioEngine } from '../../utils/sound';
import { Heart } from 'lucide-react';

export const ProductModal: React.FC = () => {
  const activeProduct = useCartStore((s) => s.activeProductModal);
  const closeProductModal = useCartStore((s) => s.closeProductModal);
  const addToCart = useCartStore((s) => s.addToCart);
  const wishlist = useCartStore((s) => s.wishlist);
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);
  const setCheckoutOpen = useCartStore((s) => s.setCheckoutOpen);
  const currency = useCartStore((s) => s.currency);

  if (!activeProduct) return null;

  const [selectedSize, setSelectedSize] = useState(activeProduct.sizes[0] || 'EU 36 / US 2');
  const [selectedColor, setSelectedColor] = useState(
    activeProduct.colors[0] || { name: 'Royal Crimson', hex: '#8b0000' }
  );
  const [added, setAdded] = useState(false);

  const isWishlisted = wishlist.includes(activeProduct.id);

  const handleAddToCart = () => {
    audioEngine.playChimeSound();
    addToCart(activeProduct, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    audioEngine.playChimeSound();
    addToCart(activeProduct, selectedSize, selectedColor);
    closeProductModal();
    setCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-8 bg-[#3b121e]/25 backdrop-blur-md animate-fade-in pointer-events-auto">
      <div className="relative w-full max-w-4xl glass-panel rounded-none overflow-y-auto md:overflow-hidden border-2 border-[#e8c3cd] shadow-2xl max-h-[92vh] md:max-h-[90vh] flex flex-col md:flex-row bg-white">
        <button
          onClick={() => {
            audioEngine.playHotspotClickSound();
            closeProductModal();
          }}
          className="fixed md:absolute top-5 right-5 md:top-4 md:right-4 z-30 px-3 py-1.5 rounded-none bg-white/95 text-[#4a121e] hover:text-white hover:bg-[#a02e46] transition-all border border-[#e8c3cd] font-nav text-[9px] tracking-[0.22em] uppercase cursor-pointer shadow-sm"
        >
          CLOSE
        </button>

        <div className="w-full md:w-1/2 p-4 sm:p-6 flex flex-col items-center justify-center bg-[#fffafc] border-b md:border-b-0 md:border-r border-[#e8c3cd]/60 shrink-0">
          <div className="relative w-full aspect-[4/4] sm:aspect-[3/4] max-h-[42vh] md:max-h-none rounded-none overflow-hidden group shadow-md border border-[#f8bbd0]/50">
            <img
              src={activeProduct.image}
              alt={activeProduct.name}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col justify-between md:overflow-y-auto bg-white">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2 pr-14 md:pr-16">
              <span className="font-nav text-[9px] sm:text-[10px] uppercase tracking-[0.24em] sm:tracking-[0.28em] text-[#8a2b53] font-bold">
                {activeProduct.category}
              </span>
              <button
                onClick={() => toggleWishlist(activeProduct.id)}
                className={`p-2 border transition-colors cursor-pointer shrink-0 ${
                  isWishlisted
                    ? 'text-white bg-[#a02e46] border-[#a02e46]'
                    : 'text-[#581c2b] border-[#e8c3cd] hover:border-[#a02e46]'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <h2 className="font-aura-display text-xl sm:text-2xl md:text-3xl font-medium text-[#3b121e] mb-1">
              {activeProduct.name}
            </h2>
            <p className="font-serif italic text-xs sm:text-sm text-[#8a2b53] mb-3.5 sm:mb-4">{activeProduct.tagline}</p>

            <div className="flex items-baseline justify-between gap-3 mb-5 sm:mb-6 pb-3.5 sm:pb-4 border-b border-[#e8c3cd]/50">
              <span className="text-xl sm:text-2xl md:text-3xl font-aura-display font-medium tracking-[0.05em] text-[#a02e46]">
                {formatCouturePrice(activeProduct.price, currency)}
              </span>
              <span className="font-nav text-[8px] sm:text-[9px] tracking-[0.18em] sm:tracking-[0.2em] uppercase text-[#8a2b53]">
                MADE TO MEASURE
              </span>
            </div>

            <div className="mb-5 sm:mb-6">
              <h4 className="font-nav text-[10px] uppercase tracking-[0.22em] text-[#3b121e] mb-1.5">
                Fabric and Composition
              </h4>
              <p className="font-body-editorial text-xs text-[#581c2b] leading-relaxed mb-2">
                {activeProduct.description}
              </p>
              <p className="font-serif italic text-xs text-[#a02e46]">{activeProduct.materials}</p>
            </div>

            <div className="mb-5 sm:mb-6">
              <h4 className="font-nav text-[10px] uppercase tracking-[0.22em] text-[#3b121e] mb-2">
                Color Palette: <span className="text-[#a02e46]">{selectedColor.name}</span>
              </h4>
              <div className="flex gap-3">
                {activeProduct.colors.map((col, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(col)}
                    className={`w-7 h-7 rounded-none transition-all border-2 cursor-pointer ${
                      selectedColor.name === col.name
                        ? 'border-[#a02e46] scale-110 shadow-sm'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                  />
                ))}
              </div>
            </div>

            <div className="mb-5 sm:mb-6">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-nav text-[10px] uppercase tracking-[0.22em] text-[#3b121e]">
                  Select Size
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeProduct.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3 sm:px-3.5 py-1.5 rounded-none font-nav text-[9px] sm:text-[10px] tracking-[0.16em] sm:tracking-[0.18em] transition-all border cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-[#a02e46] text-white border-[#a02e46] shadow-sm'
                        : 'bg-gray-50 text-[#581c2b] border-gray-200 hover:border-[#a02e46]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#e8c3cd]/50">
            <div className="flex flex-col xs:flex-row gap-2.5 sm:gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-4 rounded-none bg-[#a02e46] hover:bg-[#801c30] text-white font-nav text-[10px] uppercase tracking-[0.24em] flex items-center justify-center transition-all cursor-pointer"
              >
                {added ? 'ADDED TO BAG' : 'ADD TO BAG'}
              </button>
              <button
                onClick={handleBuyNow}
                className="py-3.5 px-5 sm:px-6 rounded-none glass-panel text-[#3b121e] font-nav text-[10px] uppercase tracking-[0.24em] border border-[#e8c3cd] hover:bg-[#fce4ec] transition-all cursor-pointer text-center"
              >
                ACQUIRE NOW
              </button>
            </div>

            <div className="flex items-center justify-between gap-2 text-[8px] sm:text-[9px] font-nav tracking-[0.16em] sm:tracking-[0.2em] uppercase text-[#8a2b53] pt-2">
              <span>WHITE-GLOVE DELIVERY</span>
              <span>AUTHENTICITY GUARANTEED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
