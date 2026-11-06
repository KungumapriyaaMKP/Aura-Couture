import React, { useState } from 'react';
import { useCartStore } from '../../store/useCartStore';
import { formatCouturePrice } from '../../data/products';
import { audioEngine } from '../../utils/sound';
import { Check, CheckCircle, ShieldCheck, Truck } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setCheckoutOpen, cart, clearCart, currency } = useCartStore();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [confirmedTotal, setConfirmedTotal] = useState<number>(0);
  const [confirmedCount, setConfirmedCount] = useState<number>(0);
  const [orderRef, setOrderRef] = useState<string>('AC-88942');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
  });

  if (!isCheckoutOpen) return null;

  const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playChimeSound();
    setConfirmedTotal(total);
    setConfirmedCount(itemCount || 1);
    setOrderRef(`AC-${Math.floor(10000 + Math.random() * 90000)}`);
    setStep('success');
    clearCart();
  };

  const handleClose = () => {
    setCheckoutOpen(false);
    setStep('form');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3b121e]/35 backdrop-blur-md animate-fade-in pointer-events-auto">
      <div className="relative w-full max-w-xl glass-panel-dark rounded-none border-2 border-[#e8c3cd] shadow-2xl overflow-hidden bg-[#fffafc]">
        <button
          onClick={handleClose}
          className={`absolute top-4 right-4 z-20 px-3 py-1.5 border font-nav text-[9px] tracking-[0.22em] uppercase transition-colors cursor-pointer ${
            step === 'success'
              ? 'border-white/40 text-white hover:bg-white/15'
              : 'border-[#e8c3cd] text-[#3b121e] hover:bg-[#fce4ec]'
          }`}
        >
          CLOSE
        </button>

        {step === 'form' ? (
          <div className="p-6 md:p-8">
            <span className="font-nav text-[10px] uppercase tracking-[0.28em] text-[#8a2b53] block mb-1">
              CHECKOUT
            </span>
            <h2 className="font-aura-display text-2xl font-medium text-[#3b121e] mb-5">
              Complete Your Couture Order
            </h2>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div>
                <label className="font-nav text-[9px] uppercase tracking-[0.22em] text-[#3b121e] block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-none bg-white border border-[#e8c3cd] text-[#3b121e] font-semibold text-xs focus:border-[#a02e46] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-nav text-[9px] uppercase tracking-[0.22em] text-[#3b121e] block mb-1">
                  Delivery Address
                </label>
                <input
                  type="text"
                  required
                  placeholder="Residence or salon delivery address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-none bg-white border border-[#e8c3cd] text-[#3b121e] font-semibold text-xs focus:border-[#a02e46] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-nav text-[9px] uppercase tracking-[0.22em] text-[#3b121e] block mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-none bg-white border border-[#e8c3cd] text-[#3b121e] font-semibold text-xs focus:border-[#a02e46] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-nav text-[9px] uppercase tracking-[0.22em] text-[#3b121e] block mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Postal Code"
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-none bg-white border border-[#e8c3cd] text-[#3b121e] font-semibold text-xs focus:border-[#a02e46] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-nav text-[9px] uppercase tracking-[0.22em] text-[#3b121e] block mb-1">
                  Payment Reference or Card Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="Card number or private concierge invoice"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-none bg-white border border-[#e8c3cd] text-[#3b121e] font-semibold text-xs focus:border-[#a02e46] focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-[#e8c3cd]/60 flex justify-between items-center">
                <span className="font-nav text-[10px] text-[#8a2b53] uppercase tracking-[0.24em]">
                  Total Investment
                </span>
                <span className="font-serif text-2xl font-black text-[#a02e46]">
                  {formatCouturePrice(total, currency)}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-none bg-[#a02e46] hover:bg-[#801c30] text-white font-nav text-[10px] uppercase tracking-[0.26em] transition-all cursor-pointer"
              >
                CONFIRM AND PLACE ORDER
              </button>
            </form>
          </div>
        ) : (
          <div>
            {/* Top Celebratory Success Banner */}
            <div className="bg-gradient-to-b from-[#801c30] to-[#a02e46] text-white px-6 py-8 text-center relative overflow-hidden">
              <div className="mx-auto mb-3 w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-300 flex items-center justify-center shadow-lg">
                <div className="w-11 h-11 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/25 border border-emerald-300/60 text-emerald-100 font-nav text-[9px] uppercase tracking-[0.26em] mb-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-300" />
                <span>Order Successfully Placed</span>
              </div>

              <h2 className="font-aura-display text-3xl text-white tracking-wide">
                Thank You{formData.fullName ? `, ${formData.fullName}` : ''}!
              </h2>
              <p className="text-xs text-[#fce4ec]/90 mt-1 max-w-md mx-auto">
                Your payment has been verified and your bespoke order is now in preparation.
              </p>
            </div>

            {/* Order Progress & Official Receipt */}
            <div className="p-6 md:p-8 space-y-6 bg-[#fffafc]">
              {/* 3-Step Live Status Bar */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 bg-emerald-50 border border-emerald-200">
                  <div className="w-6 h-6 mx-auto mb-1 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="font-nav text-[8px] uppercase tracking-[0.18em] text-emerald-800 font-bold block">
                    Confirmed
                  </span>
                </div>

                <div className="p-3 bg-[#fbf4f6] border border-[#e8c3cd]">
                  <div className="w-6 h-6 mx-auto mb-1 rounded-full bg-[#a02e46] text-white flex items-center justify-center">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-nav text-[8px] uppercase tracking-[0.18em] text-[#4a121e] font-bold block">
                    Steaming & Trunk
                  </span>
                </div>

                <div className="p-3 bg-[#fbf4f6] border border-[#e8c3cd]">
                  <div className="w-6 h-6 mx-auto mb-1 rounded-full bg-[#fce4ec] text-[#a02e46] flex items-center justify-center">
                    <Truck className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-nav text-[8px] uppercase tracking-[0.18em] text-[#8a2b53] font-bold block">
                    White-Glove Dispatch
                  </span>
                </div>
              </div>

              {/* Official Receipt Card */}
              <div className="bg-white border border-[#e8c3cd] p-5 space-y-3 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-[#e8c3cd]/60">
                  <div>
                    <span className="font-nav text-[8px] uppercase tracking-[0.22em] text-[#8a2b53] block">
                      Order Reference
                    </span>
                    <span className="font-mono text-sm font-black text-[#3b121e] tracking-wider">
                      {orderRef}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-300 text-emerald-700 font-nav text-[8px] uppercase tracking-[0.2em] font-bold">
                    PAID & VERIFIED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs pt-1">
                  <div>
                    <span className="font-nav text-[8px] uppercase tracking-[0.2em] text-[#8a2b53] block mb-0.5">
                      Recipient & Destination
                    </span>
                    <p className="font-semibold text-[#3b121e]">
                      {formData.fullName || 'Valued Client'}
                    </p>
                    <p className="text-[#801c30] text-[11px]">
                      {formData.address}
                      {formData.city ? `, ${formData.city}` : ''}{' '}
                      {formData.zip}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="font-nav text-[8px] uppercase tracking-[0.2em] text-[#8a2b53] block mb-0.5">
                      Amount Paid ({confirmedCount} {confirmedCount === 1 ? 'Piece' : 'Pieces'})
                    </span>
                    <span className="font-aura-display text-xl font-bold text-[#a02e46]">
                      {formatCouturePrice(confirmedTotal, currency)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3.5 rounded-none bg-[#a02e46] text-white font-nav text-[10px] uppercase tracking-[0.26em] hover:bg-[#801c30] transition-colors cursor-pointer shadow-md"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
