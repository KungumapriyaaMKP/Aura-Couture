import React, { useState } from 'react';
import { useCartStore } from '../../store/useCartStore';
import { formatCouturePrice } from '../../data/products';
import { audioEngine } from '../../utils/sound';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity, setCheckoutOpen, currency } =
    useCartStore();
  const [giftWrapped, setGiftWrapped] = useState(true);

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleCheckout = () => {
    audioEngine.playChimeSound();
    toggleCart();
    setCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#3b121e]/25 backdrop-blur-sm animate-fade-in pointer-events-auto">
      <div className="w-full max-w-md h-full glass-panel-dark border-l-2 border-[#e8c3cd] flex flex-col justify-between p-6 shadow-2xl overflow-hidden bg-[#fffafc]">
        <div className="flex items-center justify-between pb-4 border-b border-[#e8c3cd]/60">
          <h3 className="font-aura-display text-xl font-medium text-[#3b121e] tracking-[0.08em] uppercase">
            SHOPPING BAG
          </h3>
          <button
            onClick={() => {
              audioEngine.playHotspotClickSound();
              toggleCart();
            }}
            className="px-3 py-1.5 border border-[#e8c3cd] font-nav text-[9px] tracking-[0.22em] uppercase text-[#3b121e] hover:bg-[#fce4ec] transition-colors cursor-pointer"
          >
            CLOSE
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <p className="font-aura-display text-xl text-[#3b121e] font-medium mb-2">
                Your shopping bag is empty
              </p>
              <p className="text-xs text-[#8a2b53] max-w-xs font-medium leading-relaxed">
                Explore our couture salon and seasonal lookbooks to select bespoke creations.
              </p>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${idx}`}
                className="glass-panel p-4 rounded-none flex gap-4 border border-[#e8c3cd] items-center bg-white"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-22 object-cover rounded-none border border-[#f8bbd0]/50 shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-serif font-black text-[#3b121e] mb-1">
                      {item.product.name}
                    </h4>
                    <div className="text-[10px] font-nav tracking-[0.16em] uppercase text-[#8a2b53]">
                      Size: {item.selectedSize} | {item.selectedColor.name}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#e8c3cd]/40">
                    <div className="flex items-center gap-2 border border-[#e8c3cd] px-2 py-0.5">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, -1)}
                        className="text-[#3b121e] hover:text-[#a02e46] px-1 text-xs font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-xs text-[#3b121e] font-black w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, 1)}
                        className="text-[#3b121e] hover:text-[#a02e46] px-1 text-xs font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-black text-[#a02e46]">
                      {formatCouturePrice(item.product.price * item.quantity, currency)}
                    </span>

                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedSize)}
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

        {cart.length > 0 && (
          <div className="pt-4 border-t border-[#e8c3cd]/60 space-y-4">
            <label className="flex items-center gap-2.5 text-xs text-[#3b121e] font-semibold cursor-pointer glass-panel p-3 rounded-none border border-[#e8c3cd] bg-white">
              <input
                type="checkbox"
                checked={giftWrapped}
                onChange={(e) => setGiftWrapped(e.target.checked)}
                className="accent-[#a02e46]"
              />
              <span>Include Signature Velvet Garment Trunk</span>
            </label>

            <div className="flex justify-between items-center text-sm">
              <span className="font-nav text-[10px] text-[#8a2b53] uppercase tracking-[0.24em]">
                Subtotal
              </span>
              <span className="font-serif font-black text-xl text-[#3b121e]">
                {formatCouturePrice(subtotal, currency)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3.5 rounded-none bg-[#a02e46] hover:bg-[#801c30] text-white font-nav text-[10px] uppercase tracking-[0.26em] transition-all cursor-pointer"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
