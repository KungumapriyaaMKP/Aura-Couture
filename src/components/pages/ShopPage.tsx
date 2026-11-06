import React, { useState, useMemo } from 'react';
import { PRODUCTS, formatCouturePrice, type Product } from '../../data/products';
import { useCartStore } from '../../store/useCartStore';
import { audioEngine } from '../../utils/sound';
import { StudioFooter } from '../ui/StudioFooter';
import { Heart } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const {
    openProductModal,
    addToCart,
    wishlist,
    toggleWishlist,
  } = useCartStore();

  const [priceFilter, setPriceFilter] = useState<'all' | 'under-150k' | '150k-200k' | 'above-200k'>('all');
  const [fabricFilter, setFabricFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'hours'>('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesPrice =
        priceFilter === 'all' ||
        (priceFilter === 'under-150k' && p.price < 150000) ||
        (priceFilter === '150k-200k' && p.price >= 150000 && p.price <= 200000) ||
        (priceFilter === 'above-200k' && p.price > 200000);

      const matchesFabric =
        fabricFilter === 'all' ||
        p.materials.toLowerCase().includes(fabricFilter.toLowerCase());

      const matchesSearch =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.materials.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesPrice && matchesFabric && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'hours') return (b.artisanHours || 0) - (a.artisanHours || 0);
      return 0;
    });
  }, [priceFilter, fabricFilter, sortBy, searchQuery]);

  const hasActiveFilters =
    priceFilter !== 'all' ||
    fabricFilter !== 'all' ||
    searchQuery.trim() !== '';

  const resetFilters = () => {
    audioEngine.playHotspotClickSound();
    setPriceFilter('all');
    setFabricFilter('all');
    setSortBy('featured');
    setSearchQuery('');
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    audioEngine.playChimeSound();
    addToCart(
      product,
      product.sizes[0] || 'EU 38 / US 4',
      product.colors[0] || { name: 'Royal Crimson', hex: '#8b0000' }
    );
    setQuickAddedId(product.id);
    setTimeout(() => setQuickAddedId(null), 1800);
  };

  return (
    <div className="min-h-screen w-full bg-[#fbf4f6] text-[#4a121e] pt-24 pb-24 px-4 sm:px-8 md:px-14 relative z-20 select-none">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(216,138,154,0.16),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(160,46,70,0.08),transparent_50%)] z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Neat Architectural Filter and Sort Toolbar */}
        <div className="glass-panel border border-[#e8c3cd] bg-white px-5 py-4 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5 w-full justify-between">
            <div className="flex flex-wrap items-center gap-2.5">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search gown..."
                className="w-full sm:w-44 px-3.5 py-2 bg-[#fbf4f6] border border-[#e8c3cd] focus:border-[#a02e46] focus:bg-white focus:outline-none text-xs text-[#4a121e] placeholder-[#a02e46]/50 font-medium"
              />

              <select
                value={fabricFilter}
                onChange={(e) => setFabricFilter(e.target.value)}
                className="px-3.5 py-2 bg-[#fbf4f6] border border-[#e8c3cd] focus:border-[#a02e46] text-[10px] font-nav tracking-[0.18em] text-[#4a121e] uppercase focus:outline-none cursor-pointer"
              >
                <option value="all">Fabric: All</option>
                <option value="silk tulle">Silk Tulle</option>
                <option value="velvet">Silk Velvet</option>
                <option value="chiffon">Silk Chiffon</option>
                <option value="satin">Duchesse Satin</option>
                <option value="lace">Chantilly Lace</option>
              </select>

              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value as any)}
                className="px-3.5 py-2 bg-[#fbf4f6] border border-[#e8c3cd] focus:border-[#a02e46] text-[10px] font-nav tracking-[0.18em] text-[#4a121e] uppercase focus:outline-none cursor-pointer"
              >
                <option value="all">Price: All</option>
                <option value="under-150k">Under INR 1,50,000</option>
                <option value="150k-200k">INR 1,50,000 to 2,00,000</option>
                <option value="above-200k">Above INR 2,00,000</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3.5 py-2 bg-[#fbf4f6] border border-[#e8c3cd] focus:border-[#a02e46] text-[10px] font-nav tracking-[0.18em] text-[#4a121e] uppercase focus:outline-none cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="hours">Craftsmanship Hours</option>
              </select>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="px-3 py-2 border border-[#a02e46] text-[#a02e46] hover:bg-[#a02e46] hover:text-white font-nav text-[9px] tracking-[0.2em] uppercase transition-colors cursor-pointer"
                >
                  RESET
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="glass-panel border border-[#e8c3cd] bg-white p-16 text-center">
            <p className="font-aura-display text-2xl text-[#3b121e] mb-2">
              No Couture Pieces Match Your Selection
            </p>
            <p className="text-xs text-[#801c30] mb-6">
              Adjust your category, fabric, or price filters to view available creations.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-[#a02e46] text-white font-nav text-[10px] tracking-[0.24em] uppercase cursor-pointer"
            >
              RESET FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist.includes(product.id);

              return (
                <div
                  key={product.id}
                  onClick={() => {
                    audioEngine.playHotspotClickSound();
                    openProductModal(product);
                  }}
                  className="group glass-panel border border-[#e8c3cd] hover:border-[#f09bb5] bg-white transition-all duration-500 flex flex-col justify-between cursor-pointer hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(244,143,177,0.6),0_20px_55px_rgba(160,46,70,0.22)]"
                >
                  <div>
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#fbf4f6] border-b border-[#e8c3cd]/60">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-108"
                      />

                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,240,246,0.3),rgba(232,160,180,0.1)_55%,transparent_80%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />

                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {product.edition && (
                          <span className="px-2.5 py-1 bg-white/95 backdrop-blur-md border border-[#d88a9a] font-nav text-[9px] tracking-[0.22em] text-[#a02e46] uppercase shadow-sm">
                            {product.edition}
                          </span>
                        )}
                        {product.artisanHours && (
                          <span className="px-2.5 py-1 bg-[#3b121e]/85 text-[#fce4ec] font-nav text-[8px] tracking-[0.2em] uppercase w-fit">
                            {product.artisanHours} HRS HANDWORK
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          audioEngine.playHotspotClickSound();
                          toggleWishlist(product.id);
                        }}
                        className={`absolute top-3 right-3 p-2.5 border transition-all cursor-pointer ${
                          isWishlisted
                            ? 'bg-[#a02e46] text-white border-[#a02e46]'
                            : 'bg-white/90 text-[#4a121e] border-[#e8c3cd] hover:border-[#a02e46]'
                        }`}
                        title="Wishlist"
                      >
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-nav text-[9px] tracking-[0.28em] text-[#a02e46]/85 uppercase">
                          {product.category}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {product.colors.map((col, i) => (
                            <span
                              key={i}
                              className="w-2.5 h-2.5 border border-[#d88a9a]"
                              style={{ backgroundColor: col.hex }}
                              title={col.name}
                            />
                          ))}
                        </div>
                      </div>

                      <h3 className="font-aura-display text-[22px] font-medium tracking-[0.03em] text-[#3b121e] group-hover:text-[#a02e46] transition-colors mb-2 leading-snug">
                        {product.name}
                      </h3>

                      <p className="font-body-editorial text-[12px] text-[#581c2b]/85 line-clamp-2 leading-[1.7] mb-3.5">
                        {product.description}
                      </p>

                      <p className="font-serif italic text-[13px] text-[#a02e46] border-l border-[#d88a9a] pl-3 py-0.5 tracking-[0.02em]">
                        {product.materials}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-4 border-t border-[#e8c3cd]/50 flex items-center justify-between gap-4 bg-[#fffafc]">
                    <div>
                      <div className="font-aura-display text-[22px] font-medium tracking-[0.06em] text-[#a02e46] leading-tight">
                        {formatCouturePrice(product.price)}
                      </div>
                      <div className="text-[9px] font-nav tracking-[0.24em] uppercase text-[#8a2b53]/70 mt-0.5">
                        BESPOKE TAILORED FIT
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleQuickAdd(e, product)}
                      className="px-5 py-2.5 bg-[#a02e46] hover:bg-[#801c30] text-white font-nav text-[9px] tracking-[0.26em] uppercase transition-all cursor-pointer"
                    >
                      {quickAddedId === product.id ? 'IN BAG' : 'ACQUIRE'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* White-Glove Concierge Banner */}
        <div className="mt-16 glass-panel border border-[#d88a9a] bg-white p-8 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border-l-2 border-[#a02e46] pl-5">
            <span className="font-nav text-[9px] tracking-[0.26em] text-[#a02e46] uppercase block mb-1">
              SERVICE I
            </span>
            <h4 className="font-aura-display text-lg text-[#4a121e] mb-1.5">
              Private Salon and Residence Fittings
            </h4>
            <p className="text-xs text-[#801c30] leading-relaxed">
              Our senior master couturiers travel directly to your residence for discreet private measurements and bespoke consultations.
            </p>
          </div>

          <div className="border-l-2 border-[#a02e46] pl-5">
            <span className="font-nav text-[9px] tracking-[0.26em] text-[#a02e46] uppercase block mb-1">
              SERVICE II
            </span>
            <h4 className="font-aura-display text-lg text-[#4a121e] mb-1.5">
              White-Glove Express Delivery
            </h4>
            <p className="text-xs text-[#801c30] leading-relaxed">
              Every gown arrives hand-steamed in a cedarwood-scented velvet Aura Couture trunk via climate-controlled luxury courier.
            </p>
          </div>

          <div className="border-l-2 border-[#a02e46] pl-5">
            <span className="font-nav text-[9px] tracking-[0.26em] text-[#a02e46] uppercase block mb-1">
              SERVICE III
            </span>
            <h4 className="font-aura-display text-lg text-[#4a121e] mb-1.5">
              Complimentary Custom Tailoring
            </h4>
            <p className="text-xs text-[#801c30] leading-relaxed">
              Custom sleeve extensions, neckline linings, and matching silk stoles or cathedral capes are tailored upon request at no additional charge.
            </p>
          </div>
        </div>

        <StudioFooter />
      </div>
    </div>
  );
};
