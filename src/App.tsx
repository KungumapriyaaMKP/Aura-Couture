import React, { useEffect } from 'react';
import { BoutiqueCanvas } from './components/canvas/BoutiqueCanvas';
import { VideoOpeningScreen } from './components/ui/VideoOpeningScreen';
import { HeaderNavigation } from './components/ui/HeaderNavigation';
import { ChapterIndicators } from './components/ui/ChapterIndicators';
import { ProductModal } from './components/ui/ProductModal';
import { CartDrawer } from './components/ui/CartDrawer';
import { WishlistDrawer } from './components/ui/WishlistDrawer';
import { CheckoutModal } from './components/ui/CheckoutModal';
import { QuickCatalogView } from './components/ui/QuickCatalogView';
import { ShopPage } from './components/pages/ShopPage';
import { CollectionsPage } from './components/pages/CollectionsPage';
import { AboutPage } from './components/pages/AboutPage';
import { PRODUCTS } from './data/products';
import { useCartStore } from './store/useCartStore';

export const App: React.FC = () => {
  const setScrollProgress = useCartStore((s) => s.setScrollProgress);
  const setCurrentChapter = useCartStore((s) => s.setCurrentChapter);
  const activePage = useCartStore((s) => s.activePage);

  // Pre-warm all lightweight WebP product images in browser cache so Shop, Collections, and About render instantaneously
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const urls = new Set<string>(['/products/about_heritage_gown.webp']);
      PRODUCTS.forEach((p) => {
        urls.add(p.image);
      });
      urls.forEach((url) => {
        const img = new Image();
        img.decoding = 'async';
        img.src = url;
      });
    }, 1500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (activePage !== 'home') return;

    window.scrollTo(0, 0);

    let ticking = false;
    let lastProgress = -1;
    let lastChapter = -1;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const docHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            window.innerHeight * 2
          );
          const totalScrollable = docHeight - window.innerHeight;
          const currentScroll = window.scrollY || window.pageYOffset || 0;
          const rawProgress = totalScrollable > 0 ? currentScroll / totalScrollable : 0;
          const progress = Math.max(0, Math.min(1, rawProgress));

          if (
            Math.abs(progress - lastProgress) >= 0.005 ||
            progress === 0 ||
            progress === 1
          ) {
            lastProgress = progress;
            setScrollProgress(progress);
          }

          const chapter = Math.min(11, Math.floor(progress * 12));
          if (chapter !== lastChapter) {
            lastChapter = chapter;
            setCurrentChapter(chapter);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activePage, setScrollProgress, setCurrentChapter]);

  return (
    <div className="relative w-full min-h-screen text-[#b33952] selection:bg-[#f8bbd0] selection:text-black">
      <HeaderNavigation />

      {activePage === 'home' && (
        <>
          <VideoOpeningScreen />
          <BoutiqueCanvas />
          <ChapterIndicators />
          <div
            className="relative z-0 w-full pointer-events-auto h-[800vh] md:h-[1200vh] min-h-[5600px] md:min-h-[12000px]"
          />
        </>
      )}

      {activePage === 'shop' && <ShopPage />}
      {activePage === 'collections' && <CollectionsPage />}
      {activePage === 'about' && <AboutPage />}

      {/* Global Interactive Modals and Drawers */}
      <ProductModal />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <QuickCatalogView />
    </div>
  );
};

export default App;
