import React, { useState } from 'react';
import { AuraCoutureVectorLogo } from '../ui/AuraCoutureVectorLogo';
import { StudioFooter } from '../ui/StudioFooter';
import { useCartStore } from '../../store/useCartStore';
import { audioEngine } from '../../utils/sound';
import { ArrowRight, Check, Crown, Gem, Sparkles, ShieldCheck } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setActivePage } = useCartStore();
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    contact: '',
    service: 'Evening Gown',
    notes: '',
  });

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playChimeSound();
    setInquirySubmitted(true);
  };

  return (
    <div className="min-h-screen w-full bg-[#fbf4f6] text-[#4a121e] pt-18 sm:pt-24 pb-16 sm:pb-24 px-3.5 sm:px-8 md:px-14 relative z-20 select-none">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_center,rgba(216,138,154,0.2),transparent_60%)] z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-10 sm:space-y-16">
        {/* 1. Brand Heritage Hero */}
        <section className="glass-panel border border-[#d88a9a]/70 bg-white overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-5 sm:p-10 md:p-14 flex flex-col justify-between">
              <div>
                <div className="mb-5 sm:mb-6">
                  <AuraCoutureVectorLogo className="w-[210px] sm:w-[280px] md:w-[300px] h-auto" />
                </div>

                <h1 className="font-aura-display text-2xl sm:text-4xl md:text-5xl text-[#3b121e] leading-tight mb-4 sm:mb-5">
                  Where Timeless Craftsmanship Meets Sovereign Grace
                </h1>

                <p className="text-xs sm:text-sm md:text-base text-[#801c30] leading-relaxed mb-3.5 sm:mb-4 font-medium">
                  Dedicated to architectural silk drapery and rare hand-embroidery, <strong className="text-[#4a121e]">Aura Couture</strong> creates heirloom evening gowns, royal bridal collections, and imperial cape silhouettes for women of extraordinary presence.
                </p>

                <p className="text-xs sm:text-sm text-[#801c30] leading-relaxed mb-6 sm:mb-8">
                  Inside our private design studios and flagship salons, every garment is cut from a single bolt of Grade-6A mulberry silk and finished by master artisans dedicating up to 460 hours to a single creation.
                </p>
              </div>

              <div className="pt-5 sm:pt-6 border-t border-[#e8c3cd] flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <button
                  onClick={() => {
                    audioEngine.playChimeSound();
                    setActivePage('collections');
                  }}
                  className="px-6 py-3.5 bg-[#a02e46] hover:bg-[#801c30] text-white font-nav text-[10px] tracking-[0.24em] sm:tracking-[0.26em] uppercase transition-colors cursor-pointer text-center"
                >
                  EXPLORE LOOKBOOKS
                </button>
                <button
                  onClick={() => {
                    audioEngine.playChimeSound();
                    setActivePage('shop');
                  }}
                  className="px-6 py-3.5 border border-[#a02e46] text-[#a02e46] hover:bg-[#fce4ec] font-nav text-[10px] tracking-[0.24em] sm:tracking-[0.26em] uppercase transition-colors cursor-pointer text-center"
                >
                  EXPLORE SHOP
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[300px] sm:min-h-[380px] bg-[#3b121e] border-t lg:border-t-0 lg:border-l border-[#e8c3cd]">
              <img
                src="/products/about_heritage_gown.webp"
                alt="Aura Couture Grand Salon"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3b121e]/80 via-transparent to-transparent flex flex-col justify-end p-5 sm:p-8 text-white">
                <span className="font-nav text-[8px] sm:text-[9px] tracking-[0.24em] sm:tracking-[0.28em] text-[#f8bbd0] uppercase mb-1">
                  THE GRAND ROSE MARBLE SALON
                </span>
                <p className="font-aura-display text-lg sm:text-xl text-white">
                  "Every dress is a quiet monument of silk, light, and posture."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Craftsmanship Metrics Bar */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {[
            {
              num: '01',
              stat: '340 HRS',
              label: 'ARTISAN HANDWORK',
              desc: 'Dedicated needlework and corsetry sculpting per signature runway gown.',
            },
            {
              num: '02',
              stat: '24K GOLD',
              label: 'AND RUBY CRYSTALS',
              desc: 'Hand-spun gold bullion threadwork and ruby crystal embellishments.',
            },
            {
              num: '03',
              stat: 'GRADE 6A',
              label: 'MULBERRY SILK',
              desc: 'Woven exclusively from the finest pure silk fibers for liquid movement.',
            },
            {
              num: '04',
              stat: 'BESPOKE',
              label: 'PRIVATE SALON FITTINGS',
              desc: 'White-glove couturier fittings for private estates and residences.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="glass-panel border border-[#d88a9a]/60 bg-white p-4 sm:p-6 md:p-8 flex flex-col justify-between"
            >
              <div>
                <span className="font-nav text-[8px] sm:text-[9px] tracking-[0.22em] sm:tracking-[0.28em] text-[#8a2b53] block mb-2 sm:mb-3">
                  STANDARD {item.num}
                </span>
                <div className="font-aura-display text-2xl sm:text-3xl md:text-4xl text-[#a02e46] mb-1">
                  {item.stat}
                </div>
                <div className="font-nav text-[8px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.24em] text-[#3b121e] uppercase mb-2">
                  {item.label}
                </div>
              </div>
              <p className="text-[11px] sm:text-xs text-[#801c30] leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </section>

        {/* 3. Three Pillars */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-10">
            <span className="font-nav text-[9px] sm:text-[10px] tracking-[0.26em] sm:tracking-[0.3em] text-[#a02e46] uppercase block mb-2">
              THE ART OF CRAFTSMANSHIP
            </span>
            <h2 className="font-aura-display text-2xl sm:text-3xl md:text-4xl text-[#3b121e]">
              The Three Pillars of Aura Couture
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                pillar: 'PILLAR I | ARCHITECTURE',
                title: 'Sculpted Corsetry',
                image: '/products/souveraine_bridal_gown.webp',
                text: 'Beneath the weightless cascade of silk tulle lies internal custom boning engineered to elevate posture and create a timeless regal silhouette without sacrificing comfort.',
              },
              {
                pillar: 'PILLAR II | FINE EMBROIDERY',
                title: 'Imperial Rose and Gold Needlework',
                image: '/products/al_amira_cape_gown.webp',
                text: 'Each floral motif, crystal cascade, and 24K gold thread pattern is applied by hand on wooden frames using techniques passed down through generations.',
              },
              {
                pillar: 'PILLAR III | PRIVATE CONCIERGE',
                title: 'Bespoke Private Concierge',
                image: '/products/sultana_velvet_ensemble.webp',
                text: 'From custom modest cape attachments to private trunk shows and residence fittings, our salon directors tailor every detail around your schedule and privacy.',
              },
            ].map((card, i) => (
              <div
                key={i}
                className="glass-panel border border-[#e8c3cd] bg-white overflow-hidden flex flex-col justify-between group"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#fbf4f6] border-b border-[#e8c3cd]">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-5 sm:p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="font-nav text-[9px] tracking-[0.24em] sm:tracking-[0.26em] text-[#a02e46] uppercase block mb-1.5">
                      {card.pillar}
                    </span>
                    <h3 className="font-aura-display text-xl sm:text-2xl text-[#3b121e] mb-2.5 sm:mb-3">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[#801c30] leading-relaxed font-medium">
                      {card.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Sleek Animated Luxury Contact Section */}
        <section className="max-w-4xl mx-auto w-full">
          <div className="overflow-hidden border border-[#d88a9a]/80 bg-white animate-couture-glow">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Velvet-Crimson Editorial Panel */}
              <div className="lg:col-span-5 relative overflow-hidden bg-gradient-to-br from-[#4a121e] via-[#7c1b30] to-[#a02e46] text-white p-6 sm:p-9 md:p-12 flex flex-col justify-between">
                <div className="pointer-events-none absolute -top-20 -right-20 w-56 h-56 rounded-full bg-[#f8bbd0]/12 blur-3xl animate-couture-float" />
                <div className="pointer-events-none absolute -bottom-24 -left-16 w-60 h-60 rounded-full bg-[#e6b980]/12 blur-3xl animate-couture-float" style={{ animationDelay: '2s' }} />

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4 sm:mb-5">
                    <Sparkles className="w-3.5 h-3.5 text-[#f8bbd0]" />
                    <span className="font-nav text-[9px] sm:text-[10px] tracking-[0.28em] sm:tracking-[0.32em] text-[#f8bbd0] uppercase">
                      CONTACT US
                    </span>
                  </div>

                  <h3 className="font-aura-display text-2xl sm:text-3xl md:text-4xl text-white leading-snug mb-3.5 sm:mb-4">
                    Private Fitting &amp; Bespoke Commission
                  </h3>

                  <p className="text-xs text-[#fce4ec]/85 leading-relaxed font-light mb-6 sm:mb-8">
                    Speak directly with our Salon Director to arrange a private suite appointment, bridal consultation, or custom residence presentation.
                  </p>

                  <div className="space-y-3 sm:space-y-3.5 pt-5 sm:pt-6 border-t border-white/15">
                    {[
                      { icon: Crown, label: 'One-on-One Couturier Fitting' },
                      { icon: Gem, label: 'Custom Silk & Crystal Palette' },
                      { icon: ShieldCheck, label: 'White-Glove Trunk Delivery' },
                    ].map((item, idx) => {
                      const IconComponent = item.icon;
                      return (
                        <div
                          key={idx}
                          className="group flex items-center gap-3 sm:gap-3.5 text-[#fce4ec] transition-transform duration-300 hover:translate-x-1"
                        >
                          <span className="w-7 h-7 shrink-0 border border-white/25 bg-white/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-white group-hover:text-[#801c30]">
                            <IconComponent className="w-3.5 h-3.5" />
                          </span>
                          <span className="font-nav text-[8px] sm:text-[9px] tracking-[0.18em] sm:tracking-[0.22em] uppercase">
                            {item.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="relative z-10 mt-7 sm:mt-10 pt-4 border-t border-white/15 text-[8px] sm:text-[9px] font-nav tracking-[0.24em] sm:tracking-[0.28em] text-[#f8bbd0]/90 uppercase">
                  BY PRIVATE APPOINTMENT
                </div>
              </div>

              {/* Right Minimalist Animated Form Panel */}
              <div className="lg:col-span-7 p-6 sm:p-9 md:p-12 bg-white flex flex-col justify-center">
                {!inquirySubmitted ? (
                  <form onSubmit={handleInquirySubmit} className="space-y-6 sm:space-y-7">
                    {/* Concise Single-Line Interest Pills */}
                    <div>
                      <label className="block font-nav text-[9px] tracking-[0.24em] sm:tracking-[0.26em] text-[#8a2b53] uppercase mb-2.5 sm:mb-3">
                        Select Commission Type
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          'Evening Gown',
                          'Imperial Cape',
                          'Royal Bridal',
                          'Private Viewing',
                        ].map((option) => {
                          const isSelected = inquiryForm.service === option;
                          return (
                            <button
                              type="button"
                              key={option}
                              onClick={() => {
                                audioEngine.playHotspotClickSound();
                                setInquiryForm({ ...inquiryForm, service: option });
                              }}
                              className={`py-2.5 px-1.5 sm:px-2 border font-nav text-[8px] sm:text-[9px] tracking-[0.14em] sm:tracking-[0.18em] uppercase transition-all duration-300 cursor-pointer text-center whitespace-nowrap ${
                                isSelected
                                  ? 'bg-[#a02e46] text-white border-[#a02e46] shadow-[0_6px_16px_rgba(160,46,70,0.22)] -translate-y-0.5'
                                  : 'bg-[#fbf4f6]/60 text-[#4a121e] border-[#e8c3cd] hover:border-[#a02e46] hover:bg-white'
                              }`}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Sleek Architectural Bottom-Line Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="group relative">
                        <label className="block font-nav text-[9px] tracking-[0.24em] text-[#8a2b53] group-focus-within:text-[#a02e46] transition-colors uppercase mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={inquiryForm.name}
                          onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                          placeholder="Your full name"
                          className="w-full py-2.5 bg-transparent border-b border-[#e8c3cd] text-xs text-[#3b121e] font-semibold placeholder-[#8a2b53]/40 focus:outline-none transition-colors"
                        />
                        <span className="pointer-events-none absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#a02e46] scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 origin-left" />
                      </div>

                      <div className="group relative">
                        <label className="block font-nav text-[9px] tracking-[0.24em] text-[#8a2b53] group-focus-within:text-[#a02e46] transition-colors uppercase mb-1">
                          Telephone or Email
                        </label>
                        <input
                          type="text"
                          required
                          value={inquiryForm.contact}
                          onChange={(e) => setInquiryForm({ ...inquiryForm, contact: e.target.value })}
                          placeholder="Direct phone or email"
                          className="w-full py-2.5 bg-transparent border-b border-[#e8c3cd] text-xs text-[#3b121e] font-semibold placeholder-[#8a2b53]/40 focus:outline-none transition-colors"
                        />
                        <span className="pointer-events-none absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#a02e46] scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 origin-left" />
                      </div>
                    </div>

                    {/* Sleek Notes Field */}
                    <div className="group relative">
                      <label className="block font-nav text-[9px] tracking-[0.24em] text-[#8a2b53] group-focus-within:text-[#a02e46] transition-colors uppercase mb-1">
                        Message or Preferences
                      </label>
                      <textarea
                        rows={2}
                        value={inquiryForm.notes}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, notes: e.target.value })}
                        placeholder="Share preferred silhouette, color palette, or message..."
                        className="w-full py-2.5 bg-transparent border-b border-[#e8c3cd] text-xs text-[#3b121e] font-medium placeholder-[#8a2b53]/40 focus:outline-none transition-colors resize-none"
                      />
                      <span className="pointer-events-none absolute bottom-1.5 left-0 right-0 h-[1.5px] bg-[#a02e46] scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 origin-left" />
                    </div>

                    {/* Shimmering Animated Submit Button */}
                    <button
                      type="submit"
                      className="group relative w-full py-4 bg-gradient-to-r from-[#801c30] via-[#a02e46] to-[#801c30] text-white font-nav text-[10px] tracking-[0.3em] uppercase shadow-[0_10px_25px_rgba(160,46,70,0.22)] hover:shadow-[0_14px_32px_rgba(160,46,70,0.34)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer overflow-hidden flex items-center justify-center gap-3"
                    >
                      <span className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-couture-shimmer" />
                      <span className="relative z-10 font-bold">SEND PRIVATE INQUIRY</span>
                      <ArrowRight className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </button>
                  </form>
                ) : (
                  <div className="my-auto text-center py-8 px-4 space-y-4 animate-fade-in">
                    <div className="mx-auto w-14 h-14 rounded-full bg-[#fce4ec] border border-[#d88a9a] flex items-center justify-center shadow-sm animate-couture-float">
                      <Check className="w-6 h-6 text-[#a02e46] stroke-[2.5]" />
                    </div>

                    <span className="font-nav text-[9px] tracking-[0.3em] text-[#a02e46] uppercase block">
                      INQUIRY CONFIRMED
                    </span>

                    <h3 className="font-aura-display text-3xl text-[#3b121e]">
                      Thank You{inquiryForm.name ? `, ${inquiryForm.name}` : ''}
                    </h3>

                    <p className="text-xs text-[#801c30] leading-relaxed max-w-sm mx-auto">
                      Your private inquiry for <span className="font-bold text-[#3b121e]">{inquiryForm.service}</span> has been received by our Senior Salon Director.
                    </p>

                    <div className="pt-2">
                      <button
                        onClick={() => setInquirySubmitted(false)}
                        className="px-6 py-2.5 border border-[#a02e46] text-[#a02e46] font-nav text-[9px] tracking-[0.24em] uppercase hover:bg-[#a02e46] hover:text-white transition-all duration-300 cursor-pointer"
                      >
                        SEND ANOTHER REQUEST
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <StudioFooter />
      </div>
    </div>
  );
};
