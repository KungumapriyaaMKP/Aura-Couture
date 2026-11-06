import React from 'react';
import { useCartStore, type ActivePage } from '../../store/useCartStore';
import { audioEngine } from '../../utils/sound';
import { Grid, Heart, ShoppingBag } from 'lucide-react';

export const HeaderNavigation: React.FC = () => {
  const {
    cart,
    scrollProgress,
    toggleCart,
    toggleCatalog,
    wishlist,
    toggleWishlistDrawer,
    activePage,
    setActivePage,
  } = useCartStore();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navigateTo = (page: ActivePage) => {
    audioEngine.playChimeSound();
    setActivePage(page);
  };

  const centerTitleOpacity =
    activePage !== 'home'
      ? 1
      : Math.max(0, Math.min(1, (scrollProgress - 0.06) * 12));

  const navItems: { id: ActivePage; label: string }[] = [
    ...(activePage !== 'home' ? [{ id: 'home' as ActivePage, label: 'RUNWAY' }] : []),
    { id: 'shop', label: 'SHOP' },
    { id: 'collections', label: 'COLLECTIONS' },
    { id: 'about', label: 'ABOUT' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 px-6 md:px-10 py-4 md:py-5 flex items-center justify-between pointer-events-auto select-none transition-all duration-300 ${
        activePage !== 'home'
          ? 'bg-[#fbf4f6]/92 backdrop-blur-md border-b border-[#e8c3cd]/80 shadow-[0_4px_25px_rgba(160,46,70,0.06)]'
          : ''
      }`}
    >
      {/* Top Left Navigation Links */}
      <nav className="flex items-center gap-6 sm:gap-8 md:gap-10 font-nav text-xs md:text-sm font-bold tracking-[0.28em] text-[#a02e46]">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`group relative py-1 transition-all cursor-pointer uppercase tracking-[0.28em] ${
                isActive
                  ? 'text-[#801c30]'
                  : 'text-[#a02e46] hover:text-[#801c30]'
              }`}
            >
              <span>{item.label}</span>
              <span
                className={`absolute left-0 right-0 -bottom-0.5 h-[2px] bg-[#a02e46] transition-transform duration-300 origin-left ${
                  isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-active:scale-x-100'
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* Center Brand Title */}
      <div
        className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 text-center pointer-events-auto items-center justify-center transition-opacity duration-300"
        style={{
          opacity: centerTitleOpacity,
          pointerEvents: centerTitleOpacity > 0.1 ? 'auto' : 'none',
        }}
      >
        <button
          onClick={() => navigateTo('home')}
          className="font-brand-title text-lg md:text-xl font-bold text-[#a02e46] tracking-[0.32em] hover:opacity-85 transition-opacity cursor-pointer whitespace-nowrap"
          title="Return to Aura Couture Runway"
        >
          AURA COUTURE
        </button>
      </div>

      {/* Top Right Editorial Controls */}
      <div className="flex items-center gap-2.5 md:gap-3">
        <button
          onClick={() => {
            audioEngine.playChimeSound();
            toggleCatalog();
          }}
          className="flex items-center glass-panel p-2.5 md:p-3 rounded-none text-[#8a2b53] border border-[#e8c3cd]/60 hover:border-[#c4607e] bg-white/85 shadow-sm cursor-pointer transition-all"
          title="Catalogue Grid"
        >
          <Grid className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        <button
          onClick={() => {
            audioEngine.playChimeSound();
            toggleWishlistDrawer();
          }}
          className="flex items-center glass-panel p-2.5 md:p-3 rounded-none text-[#8a2b53] border border-[#e8c3cd]/60 hover:border-[#c4607e] bg-white/85 shadow-sm cursor-pointer transition-all"
          title="Wishlist"
        >
          <Heart className={`w-4 h-4 md:w-5 md:h-5 ${wishlist.length > 0 ? 'fill-[#a02e46] text-[#a02e46]' : ''}`} />
          {wishlist.length > 0 && (
            <span className="ml-1 text-xs text-[#4a121e] font-black">{wishlist.length}</span>
          )}
        </button>

        <button
          onClick={() => {
            audioEngine.playChimeSound();
            toggleCart();
          }}
          className="flex items-center glass-panel p-2.5 md:p-3 rounded-none text-[#8a2b53] border border-[#e8c3cd]/60 hover:border-[#c4607e] bg-white/85 shadow-sm cursor-pointer transition-all"
          title="Shopping Bag"
        >
          <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
          {totalItems > 0 && (
            <span className="ml-1 text-xs text-[#4a121e] font-black">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
