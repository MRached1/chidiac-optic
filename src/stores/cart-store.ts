import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types";

export interface CartItem {
  product: Product;
  quantity: number;
  color?: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, quantity?: number, color?: string) => void;
  removeItem: (productId: string, color?: string) => void;
  updateQuantity: (productId: string, quantity: number, color?: string) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product, quantity = 1, color) => {
        const items = get().items;
        const existing = items.find(
          (item) => item.product.id === product.id && item.color === color
        );

        if (existing) {
          set({
            items: items.map((item) =>
              item.product.id === product.id && item.color === color
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({ items: [...items, { product, quantity, color }] });
        }
        set({ isOpen: true });
      },

      removeItem: (productId, color) => {
        set({
          items: get().items.filter(
            (item) =>
              !(item.product.id === productId && item.color === color)
          ),
        });
      },

      updateQuantity: (productId, quantity, color) => {
        if (quantity <= 0) {
          get().removeItem(productId, color);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.product.id === productId && item.color === color
              ? { ...item, quantity }
              : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getItemCount: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),

      getSubtotal: () =>
        get().items.reduce((total, item) => {
          const price = item.product.salePrice ?? item.product.price;
          return total + price * item.quantity;
        }, 0),
    }),
    {
      name: "chidiac-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
