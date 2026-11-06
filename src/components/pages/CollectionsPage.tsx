import React, { useState } from 'react';
import {
  COLLECTIONS_DATA,
  PRODUCTS,
  formatCouturePrice,
  type CoutureCollection,
} from '../../data/products';
import { useCartStore } from '../../store/useCartStore';
import { audioEngine } from '../../utils/sound';
import { StudioFooter } from '../ui/StudioFooter';

export const CollectionsPage: React.FC = () => {
  const { openProductModal, currency, setActivePage } = useCartStore();
  const [selectedFrameByCollection, setSelectedFrameByCollection] = useState<Record<string, string>>({});
  const [bookingCollection, setBookingCollection] = useState<CoutureCollection | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingSalon, setBookingSalon] = useState('Flagship Fashion Avenue VIP Suite');
  const [bookingDate, setBookingDate] = useState('2026-11-15');
  const [clientName, setClientName] = useState('');

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playChimeSound();
    setBookingConfirmed(true);
  };

  return (
    <div className="min-h-screen w-full bg-[#fbf4f6] text-[#4a121e] pt-24 pb-24 px-4 sm:px-8 md:px-14 relative z-20 select-none">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(216,138,154,0.18),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(160,46,70,0.1),transparent_50%)] z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Lookbook Chapters */}
        <div className="space-y-16">
          {COLLECTIONS_DATA.map((collection, index) => {
            const activeHero =
              selectedFrameByCollection[collection.id] || collection.heroImage;
            const collectionProducts = PRODUCTS.filter(
              (p) => p.collectionId === collection.id
            );

            return (
              <section
                key={collection.id}
                className="glass-panel border border-[#d88a9a]/70 bg-white overflow-hidden shadow-lg"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Left Visual Gallery */}
                  <div className="lg:col-span-7 bg-[#fbf4f6] border-b lg:border-b-0 lg:border-r border-[#e8c3cd] p-6 md:p-8 flex flex-col justify-between">
                    <div className="relative aspect-[16/10] w-full overflow-hidden border border-[#d88a9a]/50 bg-[#3b121e]">
                      <img
                        src={activeHero}
                        alt={collection.title}
                        className="w-full h-full object-cover transition-all duration-700"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md border border-[#d88a9a] font-nav text-[9px] tracking-[0.25em] text-[#a02e46] uppercase">
                        CHAPTER 0{index + 1} | {collection.frenchSubtitle}
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-nav text-[9px] tracking-[0.24em] text-[#8a2b53] uppercase">
                          Select Lookbook Frame
                        </span>
                        <span className="font-nav text-[9px] tracking-[0.2em] text-[#a02e46]">
                          {collection.runwayFrames.length} STILL FRAMES
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-3">
                        {collection.runwayFrames.map((frameUrl, fIdx) => {
                          const isSelected = activeHero === frameUrl;
                          return (
                            <button
                              key={fIdx}
                              onClick={() => {
                                audioEngine.playHotspotClickSound();
                                setSelectedFrameByCollection((prev) => ({
                                  ...prev,
                                  [collection.id]: frameUrl,
                                }));
                              }}
                              className={`relative aspect-[16/10] overflow-hidden border-2 transition-all cursor-pointer ${
                                isSelected
                                  ? 'border-[#a02e46] scale-[1.02] shadow-md'
                                  : 'border-[#e8c3cd] opacity-75 hover:opacity-100'
                              }`}
                            >
                              <img
                                src={frameUrl}
                                alt={`${collection.title} frame ${fIdx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Right Editorial Narrative */}
                  <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-between bg-white">
                    <div>
                      <span className="font-nav text-[10px] tracking-[0.28em] text-[#a02e46] uppercase block mb-2">
                        {collection.season}
                      </span>
                      <h2 className="font-aura-display text-3xl md:text-4xl text-[#3b121e] mb-2">
                        {collection.title}
                      </h2>
                      <p className="font-couture-subtitle text-xs text-[#8a2b53] uppercase mb-5">
                        {collection.frenchSubtitle}
                      </p>

                      <p className="text-sm text-[#4a121e] leading-relaxed mb-4 font-medium">
                        {collection.description}
                      </p>

                      <div className="p-4 bg-[#fbf4f6] border-l-2 border-[#a02e46] mb-6">
                        <span className="font-nav text-[9px] tracking-[0.24em] text-[#a02e46] uppercase block mb-1">
                          Creative Direction
                        </span>
                        <p className="text-xs italic text-[#801c30] leading-relaxed">
                          "{collection.inspiration}"
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-y border-[#e8c3cd]/70">
                        <div>
                          <div className="font-nav text-[9px] tracking-[0.2em] text-[#8a2b53] uppercase">
                            Archive Volume
                          </div>
                          <div className="font-aura-display text-base text-[#3b121e]">
                            {collection.pieceCount} Couture Looks
                          </div>
                        </div>

                        <div>
                          <div className="font-nav text-[9px] tracking-[0.2em] text-[#8a2b53] uppercase">
                            Atelier Craft
                          </div>
                          <div className="font-aura-display text-base text-[#3b121e]">
                            {collection.artisanHoursTotal}
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <span className="font-nav text-[9px] tracking-[0.24em] text-[#8a2b53] uppercase block mb-2">
                          Signature Textiles and Embellishments
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {collection.keyMaterials.map((mat) => (
                            <span
                              key={mat}
                              className="px-2.5 py-1 bg-[#fce4ec]/60 border border-[#e8c3cd] text-[11px] font-semibold text-[#801c30]"
                            >
                              {mat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#e8c3cd]/60 space-y-3">
                      <div className="text-xs text-[#801c30] font-semibold">
                        {collection.locationShowcase}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => {
                            audioEngine.playChimeSound();
                            setBookingCollection(collection);
                            setBookingConfirmed(false);
                          }}
                          className="flex-1 py-3 px-4 bg-[#a02e46] hover:bg-[#801c30] text-white font-nav text-[10px] tracking-[0.24em] uppercase transition-colors cursor-pointer"
                        >
                          BOOK PRIVATE VIEWING
                        </button>
                        <button
                          onClick={() => {
                            audioEngine.playChimeSound();
                            setActivePage('shop');
                          }}
                          className="py-3 px-5 border border-[#a02e46] text-[#a02e46] hover:bg-[#fce4ec] font-nav text-[10px] tracking-[0.22em] uppercase transition-colors cursor-pointer"
                        >
                          SHOP ALL
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Curated Garments Belonging to This Collection */}
                {collectionProducts.length > 0 && (
                  <div className="bg-[#fffafc] border-t border-[#e8c3cd] p-6 md:p-8">
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-nav text-[10px] tracking-[0.28em] text-[#a02e46] uppercase">
                        Featured Creations from {collection.title}
                      </span>
                      <span className="text-xs text-[#801c30] font-medium">
                        Select any gown to inspect measurements and acquire
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {collectionProducts.map((prod) => (
                        <div
                          key={prod.id}
                          onClick={() => {
                            audioEngine.playHotspotClickSound();
                            openProductModal(prod);
                          }}
                          className="group bg-white border border-[#e8c3cd] hover:border-[#a02e46] p-4 flex items-center gap-4 cursor-pointer transition-all hover:shadow-md"
                        >
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-20 h-28 object-cover border border-[#f8bbd0] shrink-0 group-hover:scale-105 transition-transform"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="font-nav text-[8px] tracking-[0.2em] text-[#a02e46] uppercase block">
                              {prod.edition || 'Haute Couture'}
                            </span>
                            <h4 className="font-aura-display text-base text-[#3b121e] group-hover:text-[#a02e46] transition-colors truncate">
                              {prod.name}
                            </h4>
                            <p className="text-[11px] text-[#801c30] line-clamp-1 mb-2">
                              {prod.tagline}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="font-aura-display text-sm text-[#a02e46]">
                                {formatCouturePrice(prod.price, currency)}
                              </span>
                              <span className="font-nav text-[9px] tracking-[0.2em] text-[#4a121e] uppercase">
                                INSPECT
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>

        <StudioFooter />
      </div>

      {/* Private Viewing Appointment Modal */}
      {bookingCollection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3b121e]/35 backdrop-blur-md">
          <div className="glass-panel-dark border-2 border-[#d88a9a] bg-white max-w-lg w-full p-8 relative shadow-2xl">
            <button
              onClick={() => setBookingCollection(null)}
              className="absolute top-4 right-4 px-3 py-1 border border-[#e8c3cd] text-[9px] font-nav tracking-[0.2em] uppercase text-[#4a121e] hover:bg-[#fce4ec] cursor-pointer"
            >
              CLOSE
            </button>

            {!bookingConfirmed ? (
              <form onSubmit={handleBookSubmit} className="space-y-4">
                <div className="text-[#a02e46] font-nav text-[10px] tracking-[0.28em] uppercase">
                  VIP PRIVATE SALON CONCIERGE
                </div>
                <h3 className="font-aura-display text-2xl text-[#3b121e]">
                  Reserve Viewing: {bookingCollection.title}
                </h3>
                <p className="text-xs text-[#801c30] leading-relaxed">
                  Arrange a closed-door presentation of the complete {bookingCollection.title} archive or request a private trunk show at your residence.
                </p>

                <div>
                  <label className="block font-nav text-[9px] tracking-[0.22em] text-[#4a121e] uppercase mb-1">
                    Your Name or Title
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full px-3.5 py-2.5 border border-[#d88a9a] text-xs text-[#3b121e] font-semibold focus:outline-none focus:border-[#a02e46]"
                  />
                </div>

                <div>
                  <label className="block font-nav text-[9px] tracking-[0.22em] text-[#4a121e] uppercase mb-1">
                    Preferred Salon or Residence
                  </label>
                  <select
                    value={bookingSalon}
                    onChange={(e) => setBookingSalon(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-[#d88a9a] text-xs text-[#3b121e] font-semibold bg-white focus:outline-none focus:border-[#a02e46]"
                  >
                    <option>Flagship Fashion Avenue VIP Suite</option>
                    <option>Bespoke Design Studio</option>
                    <option>Royal Private Salon</option>
                    <option>Private Residence Trunk Show</option>
                    <option>Grand Couture Suite</option>
                  </select>
                </div>

                <div>
                  <label className="block font-nav text-[9px] tracking-[0.22em] text-[#4a121e] uppercase mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-[#d88a9a] text-xs text-[#3b121e] font-semibold focus:outline-none focus:border-[#a02e46]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#a02e46] hover:bg-[#801c30] text-white font-nav text-[10px] tracking-[0.28em] uppercase transition-colors cursor-pointer"
                >
                  CONFIRM PRIVATE SALON INVITATION
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <span className="font-nav text-[10px] tracking-[0.28em] text-[#a02e46] uppercase block">
                  INVITATION CONFIRMED
                </span>
                <h3 className="font-aura-display text-2xl text-[#3b121e]">
                  Private Viewing Reserved
                </h3>
                <p className="text-xs text-[#801c30] leading-relaxed max-w-sm mx-auto">
                  Thank you{clientName ? `, ${clientName}` : ''}. Our Senior Salon Director at <span className="font-bold">{bookingSalon}</span> has reserved the <span className="italic">{bookingCollection.title}</span> collection for your private viewing on <span className="font-bold">{bookingDate}</span>.
                </p>
                <button
                  onClick={() => setBookingCollection(null)}
                  className="px-6 py-2.5 bg-[#a02e46] text-white font-nav text-[10px] tracking-[0.24em] uppercase cursor-pointer"
                >
                  RETURN TO LOOKBOOKS
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
