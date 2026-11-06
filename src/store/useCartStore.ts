import { create } from 'zustand';
import type { Product } from '../data/products';

export type ActivePage = 'home' | 'shop' | 'collections' | 'about';
export type CurrencyCode = 'INR' | 'AED' | 'USD';

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: { name: string; hex: string };
  quantity: number;
}

interface CartStore {
  // Active Page Navigation
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;

  // Currency Preference (UAE Demo Ready)
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;

  // Video Opening State
  isVideoEnded: boolean;
  setVideoEnded: (ended: boolean) => void;

  // Cart state
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: Product, size: string, color: { name: string; hex: string }) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, delta: number) => void;
  clearCart: () => void;
  toggleCart: () => void;

  // Wishlist state
  wishlist: string[];
  isWishlistOpen: boolean;
  toggleWishlist: (productId: string) => void;
  toggleWishlistDrawer: () => void;
  clearWishlist: () => void;

  // Product Drawer State
  activeProductModal: Product | null;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;

  // Audio State
  isAudioMuted: boolean;
  toggleAudio: () => void;

  // Navigation & Scene Chapter
  currentChapter: number;
  scrollProgress: number;
  setCurrentChapter: (chapter: number) => void;
  setScrollProgress: (progress: number) => void;

  // Focused 3D target for camera zoom
  focusTarget: [number, number, number] | null;
  setFocusTarget: (target: [number, number, number] | null) => void;

  // Quick catalog drawer
  isCatalogOpen: boolean;
  toggleCatalog: () => void;

  // Checkout modal
  isCheckoutOpen: boolean;
  setCheckoutOpen: (open: boolean) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  activePage: 'home',
  setActivePage: (page) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    set({ activePage: page, isCatalogOpen: false });
  },

  currency: 'INR',
  setCurrency: (currency) => set({ currency }),

  isVideoEnded: false,
  setVideoEnded: (ended) => set({ isVideoEnded: ended }),

  cart: [],
  isCartOpen: false,
  addToCart: (product, size, color) => {
    set((state) => {
      const existingIndex = state.cart.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );

      if (existingIndex > -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingIndex].quantity += 1;
        return { cart: updatedCart, isCartOpen: true };
      }

      return {
        cart: [...state.cart, { product, selectedSize: size, selectedColor: color, quantity: 1 }],
        isCartOpen: true,
      };
    });
  },

  removeFromCart: (productId, size) => {
    set((state) => ({
      cart: state.cart.filter(
        (item) => !(item.product.id === productId && item.selectedSize === size)
      ),
    }));
  },

  updateQuantity: (productId, size, delta) => {
    set((state) => ({
      cart: state.cart.map((item) => {
        if (item.product.id === productId && item.selectedSize === size) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      }),
    }));
  },

  clearCart: () => set({ cart: [] }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  wishlist: [],
  isWishlistOpen: false,
  toggleWishlist: (productId) => {
    set((state) => {
      const exists = state.wishlist.includes(productId);
      return {
        wishlist: exists
          ? state.wishlist.filter((id) => id !== productId)
          : [...state.wishlist, productId],
      };
    });
  },
  toggleWishlistDrawer: () => set((state) => ({ isWishlistOpen: !state.isWishlistOpen })),
  clearWishlist: () => set({ wishlist: [] }),

  activeProductModal: null,
  openProductModal: (product) => set({ activeProductModal: product }),
  closeProductModal: () => set({ activeProductModal: null, focusTarget: null }),

  isAudioMuted: false,
  toggleAudio: () => set((state) => ({ isAudioMuted: !state.isAudioMuted })),

  currentChapter: 0,
  scrollProgress: 0,
  setCurrentChapter: (chapter) => set({ currentChapter: chapter }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),

  focusTarget: null,
  setFocusTarget: (target) => set({ focusTarget: target }),

  isCatalogOpen: false,
  toggleCatalog: () => set((state) => ({ isCatalogOpen: !state.isCatalogOpen })),

  isCheckoutOpen: false,
  setCheckoutOpen: (open) => set({ isCheckoutOpen: open }),
}));
