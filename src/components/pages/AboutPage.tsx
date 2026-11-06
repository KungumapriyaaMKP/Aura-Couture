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
    <div className="min-h-screen w-full bg-[#fbf4f6] text-[#4a121e] pt-24 pb-24 px-4 sm:px-8 md:px-14 relative z-20 select-none">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_center,rgba(216,138,154,0.2),transparent_60%)] z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        {/* 1. Brand Heritage Hero */}
        <section className="glass-panel border border-[#d88a9a]/70 bg-white overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-8 sm:p-12 md:p-14 flex flex-col justify-between">
              <div>
                <div className="mb-6">
                  <AuraCoutureVectorLogo className="w-[240px] sm:w-[300px] h-auto" />
                </div>

                <h1 className="font-aura-display text-3xl sm:text-4xl md:text-5xl text-[#3b121e] leading-tight mb-5">
                  Where Timeless Craftsmanship Meets Sovereign Grace
                </h1>

                <p className="text-sm md:text-base text-[#801c30] leading-relaxed mb-4 font-medium">
                  Dedicated to architectural silk drapery and rare hand-embroidery, <strong className="text-[#4a121e]">Aura Couture</strong> creates heirloom evening gowns, royal bridal collections, and imperial cape silhouettes for women of extraordinary presence.
                </p>

                <p className="text-sm text-[#801c30] leading-relaxed mb-8">
                  Inside our private design studios and flagship salons, every garment is cut from a single bolt of Grade-6A mulberry silk and finished by master artisans dedicating up to 460 hours to a single creation.
                </p>
              </div>

              <div className="pt-6 border-t border-[#e8c3cd] flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    audioEngine.playChimeSound();
                    setActivePage('collections');
                  }}
                  className="px-6 py-3.5 bg-[#a02e46] hover:bg-[#801c30] text-white font-nav text-[10px] tracking-[0.26em] uppercase transition-colors cursor-pointer"
                >
                  EXPLORE LOOKBOOKS
                </button>
                <button
                  onClick={() => {
                    audioEngine.playChimeSound();
                    setActivePage('shop');
                  }}
                  className="px-6 py-3.5 border border-[#a02e46] text-[#a02e46] hover:bg-[#fce4ec] font-nav text-[10px] tracking-[0.26em] uppercase transition-colors cursor-pointer"
                >
                  EXPLORE SHOP
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[380px] bg-[#3b121e] border-t lg:border-t-0 lg:border-l border-[#e8c3cd]">
              <img
                src="/products/about_heritage_gown.jpg"
                alt="Aura Couture Grand Salon"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3b121e]/80 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
                <span className="font-nav text-[9px] tracking-[0.28em] text-[#f8bbd0] uppercase mb-1">
                  THE GRAND ROSE MARBLE SALON
                </span>
                <p className="font-aura-display text-xl text-white">
                  "Every dress is a quiet monument of silk, light, and posture."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Craftsmanship Metrics Bar */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
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
              className="glass-panel border border-[#d88a9a]/60 bg-white p-6 md:p-8 flex flex-col justify-between"
            >
              <div>
                <span className="font-nav text-[9px] tracking-[0.28em] text-[#8a2b53] block mb-3">
                  STANDARD {item.num}
                </span>
                <div className="font-aura-display text-3xl md:text-4xl text-[#a02e46] mb-1">
                  {item.stat}
                </div>
                <div className="font-nav text-[10px] tracking-[0.24em] text-[#3b121e] uppercase mb-2">
                  {item.label}
                </div>
              </div>
              <p className="text-xs text-[#801c30] leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </section>

        {/* 3. Three Pillars */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-nav text-[10px] tracking-[0.3em] text-[#a02e46] uppercase block mb-2">
              THE ART OF CRAFTSMANSHIP
            </span>
            <h2 className="font-aura-display text-3xl md:text-4xl text-[#3b121e]">
              The Three Pillars of Aura Couture
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                pillar: 'PILLAR I | ARCHITECTURE',
                title: 'Sculpted Corsetry',
                image: '/products/souveraine_bridal_gown.jpg',
                text: 'Beneath the weightless cascade of silk tulle lies internal custom boning engineered to elevate posture and create a timeless regal silhouette without sacrificing comfort.',
              },
              {
                pillar: 'PILLAR II | FINE EMBROIDERY',
                title: 'Imperial Rose and Gold Needlework',
                image: '/products/al_amira_cape_gown.jpg',
                text: 'Each floral motif, crystal cascade, and 24K gold thread pattern is applied by hand on wooden frames using techniques passed down through generations.',
              },
              {
                pillar: 'PILLAR III | PRIVATE CONCIERGE',
                title: 'Bespoke Private Concierge',
                image: '/products/sultana_velvet_ensemble.jpg',
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
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="font-nav text-[9px] tracking-[0.26em] text-[#a02e46] uppercase block mb-1.5">
                      {card.pillar}
                    </span>
                    <h3 className="font-aura-display text-2xl text-[#3b121e] mb-3">
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

        {/* 4. Animated Luxury Contact & Private Commission Section */}
        <section className="max-w-5xl mx-auto w-full">
          <div className="relative overflow-hidden border-2 border-[#d88a9a] bg-white animate-couture-glow transition-all duration-700">
            {/* Subtle Corner Filigree Accents */}
            <div className="pointer-events-none absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#a02e46]/40 z-20" />
            <div className="pointer-events-none absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#a02e46]/40 z-20" />
            <div className="pointer-events-none absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#a02e46]/40 z-20" />
            <div className="pointer-events-none absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#a02e46]/40 z-20" />

            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Velvet-Crimson Editorial Crest Panel */}
              <div className="lg:col-span-5 relative overflow-hidden bg-gradient-to-br from-[#4a121e] via-[#801c30] to-[#a02e46] text-white p-8 md:p-11 flex flex-col justify-between">
                {/* Animated Floating Ambient Orbs */}
                <div className="pointer-events-none absolute -top-16 -right-16 w-52 h-52 rounded-full bg-[#f8bbd0]/15 blur-2xl animate-couture-float" />
                <div className="pointer-events-none absolute -bottom-20 -left-16 w-60 h-60 rounded-full bg-[#e6b980]/15 blur-2xl animate-couture-float" style={{ animationDelay: '1.8s' }} />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-md border border-white/25 mb-6 animate-couture-float">
                    <Sparkles className="w-3.5 h-3.5 text-[#f8bbd0]" />
                    <span className="font-nav text-[9px] tracking-[0.3em] text-[#fce4ec] uppercase">
                      CONTACT US
                    </span>
                  </div>

                  <h3 className="font-aura-display text-3xl md:text-4xl text-white leading-tight mb-4">
                    Private Fitting &amp; Bespoke Commission
                  </h3>

                  <p className="text-xs text-[#fce4ec]/90 leading-relaxed mb-8 font-light">
                    Connect with our Senior Salon Director to arrange a closed-door fitting, custom bridal silhouette, or private residence showcase tailored around your schedule.
                  </p>

                  <div className="space-y-4 border-t border-white/15 pt-6">
                    {[
                      {
                        icon: Crown,
                        title: 'One-on-One Couturier Consultation',
                        desc: 'Dedicated master patternmaker for individual posture and drape.',
                      },
                      {
                        icon: Gem,
                        title: 'Custom Textile & Embroidery Selection',
                        desc: 'Select from archive silk swatches and hand-strung crystal palettes.',
                      },
                      {
                        icon: ShieldCheck,
                        title: 'Discreet White-Glove Presentation',
                        desc: 'Private suite or direct residence delivery in our signature trunk.',
                      },
                    ].map((item, idx) => {
                      const IconComponent = item.icon;
                      return (
                        <div
                          key={idx}
                          className="group flex items-start gap-3.5 p-2.5 -mx-2.5 transition-all duration-300 hover:bg-white/10"
                        >
                          <div className="w-8 h-8 shrink-0 bg-white/15 border border-white/30 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-[#801c30]">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-nav text-[9px] tracking-[0.22em] text-white uppercase mb-0.5">
                              {item.title}
                            </div>
                            <p className="text-[11px] text-[#fce4ec]/80 leading-snug">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="relative z-10 mt-8 pt-5 border-t border-white/15 flex items-center justify-between text-[9px] font-nav tracking-[0.24em] text-[#f8bbd0] uppercase">
                  <span>BY APPOINTMENT</span>
                  <span>COMPLIMENTARY FITTING</span>
                </div>
              </div>

              {/* Right Interactive Animated Inquiry Form */}
              <div className="lg:col-span-7 p-8 md:p-11 bg-gradient-to-b from-white to-[#fff9fb] flex flex-col justify-center">
                {!inquirySubmitted ? (
                  <form onSubmit={handleInquirySubmit} className="space-y-6">
                    {/* Interactive Bespoke Interest Selector Pills */}
                    <div>
                      <label className="block font-nav text-[9px] tracking-[0.26em] text-[#8a2b53] uppercase mb-3">
                        1. Select Your Bespoke Interest
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {[
                          'Bespoke Evening or Gala Gown',
                          'Imperial Cape and Modest Couture',
                          'Bridal and Royal Wedding Collection',
                          'Complete Seasonal Collection Presentation',
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
                              className={`group relative text-left px-4 py-3 border transition-all duration-300 cursor-pointer flex items-center justify-between gap-2 overflow-hidden ${
                                isSelected
                                  ? 'bg-[#a02e46] text-white border-[#a02e46] shadow-[0_8px_20px_rgba(160,46,70,0.22)] -translate-y-0.5'
                                  : 'bg-[#fbf4f6]/80 text-[#4a121e] border-[#e8c3cd] hover:border-[#a02e46] hover:bg-white hover:-translate-y-0.5'
                              }`}
                            >
                              <span className="font-nav text-[9px] tracking-[0.16em] uppercase font-bold leading-relaxed">
                                {option}
                              </span>
                              <span
                                className={`w-4 h-4 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${
                                  isSelected
                                    ? 'bg-white text-[#a02e46] scale-100'
                                    : 'border border-[#d88a9a] scale-90 opacity-60 group-hover:opacity-100'
                                }`}
                              >
                                {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Side-by-Side Animated Underline Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="group relative">
                        <label className="block font-nav text-[9px] tracking-[0.24em] text-[#4a121e] group-focus-within:text-[#a02e46] transition-colors uppercase mb-1.5">
                          2. Full Name
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={inquiryForm.name}
                            onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 bg-[#fbf4f6]/70 focus:bg-white border border-[#e8c3cd] focus:border-[#d88a9a] text-xs text-[#3b121e] font-semibold focus:outline-none transition-all duration-300 focus:shadow-[0_8px_20px_rgba(160,46,70,0.08)]"
                          />
                          <span className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#a02e46] via-[#d88a9a] to-[#a02e46] scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 origin-left" />
                        </div>
                      </div>

                      <div className="group relative">
                        <label className="block font-nav text-[9px] tracking-[0.24em] text-[#4a121e] group-focus-within:text-[#a02e46] transition-colors uppercase mb-1.5">
                          3. Telephone or Email
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={inquiryForm.contact}
                            onChange={(e) => setInquiryForm({ ...inquiryForm, contact: e.target.value })}
                            placeholder="Direct phone or email"
                            className="w-full px-4 py-3 bg-[#fbf4f6]/70 focus:bg-white border border-[#e8c3cd] focus:border-[#d88a9a] text-xs text-[#3b121e] font-semibold focus:outline-none transition-all duration-300 focus:shadow-[0_8px_20px_rgba(160,46,70,0.08)]"
                          />
                          <span className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#a02e46] via-[#d88a9a] to-[#a02e46] scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 origin-left" />
                        </div>
                      </div>
                    </div>

                    {/* Animated Special Notes Textarea */}
                    <div className="group relative">
                      <label className="block font-nav text-[9px] tracking-[0.24em] text-[#4a121e] group-focus-within:text-[#a02e46] transition-colors uppercase mb-1.5">
                        4. Special Notes &amp; Preferences
                      </label>
                      <div className="relative">
                        <textarea
                          rows={3}
                          value={inquiryForm.notes}
                          onChange={(e) => setInquiryForm({ ...inquiryForm, notes: e.target.value })}
                          placeholder="Share preferred silhouettes, color palette, or message..."
                          className="w-full px-4 py-3 bg-[#fbf4f6]/70 focus:bg-white border border-[#e8c3cd] focus:border-[#d88a9a] text-xs text-[#3b121e] font-medium focus:outline-none transition-all duration-300 focus:shadow-[0_8px_20px_rgba(160,46,70,0.08)] resize-none"
                        />
                        <span className="pointer-events-none absolute bottom-1.5 left-0 right-0 h-[2px] bg-gradient-to-r from-[#a02e46] via-[#d88a9a] to-[#a02e46] scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 origin-left" />
                      </div>
                    </div>

                    {/* Shimmering Animated Submit Button */}
                    <button
                      type="submit"
                      className="group relative w-full py-4 bg-gradient-to-r from-[#801c30] via-[#a02e46] to-[#801c30] text-white font-nav text-[10px] tracking-[0.32em] uppercase shadow-[0_12px_28px_rgba(160,46,70,0.25)] hover:shadow-[0_16px_36px_rgba(160,46,70,0.38)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer overflow-hidden flex items-center justify-center gap-3"
                    >
                      <span className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-couture-shimmer" />
                      <span className="relative z-10 font-bold">SEND PRIVATE INQUIRY</span>
                      <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </button>
                  </form>
                ) : (
                  <div className="my-auto text-center py-10 px-4 space-y-5 animate-fade-in">
                    <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-300 flex items-center justify-center shadow-md animate-couture-float">
                      <div className="w-11 h-11 rounded-full bg-[#a02e46] text-white flex items-center justify-center">
                        <Check className="w-6 h-6 stroke-[3]" />
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#fce4ec] border border-[#d88a9a] font-nav text-[9px] tracking-[0.28em] text-[#a02e46] uppercase">
                      <Sparkles className="w-3 h-3" />
                      <span>INQUIRY CONFIRMED</span>
                    </div>

                    <h3 className="font-aura-display text-3xl md:text-4xl text-[#3b121e]">
                      Thank You{inquiryForm.name ? `, ${inquiryForm.name}` : ''}
                    </h3>

                    <p className="text-xs text-[#801c30] leading-relaxed max-w-md mx-auto">
                      Your bespoke inquiry for <span className="font-bold text-[#3b121e]">{inquiryForm.service}</span> has been registered with our Senior Salon Director. We will reach out to you shortly.
                    </p>

                    <div className="pt-2">
                      <button
                        onClick={() => setInquirySubmitted(false)}
                        className="px-7 py-3 border border-[#a02e46] text-[#a02e46] font-nav text-[10px] tracking-[0.26em] uppercase hover:bg-[#a02e46] hover:text-white transition-all duration-300 cursor-pointer"
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
