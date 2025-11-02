import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../service/api";
import type { ProductCardItem } from "../types";
import useUserStore from "./useAuthStore";

interface CartItem {
  productId: string;
  quantity: number;
  product?: ProductCardItem;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
  loadCart: (user?: any) => Promise<void>;
  addToCart: (product: any, user?: any) => Promise<void>;
  updateQuantity: (
    productId: string,
    quantity: number,
    user?: any
  ) => Promise<void>;
  removeCartItem: (productId: string, user?: any) => Promise<void>;
  mergeCart: () => Promise<void>;
  clearCart: () => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalPrice: 0,
      loadCart: async () => {
        const isLoggedIn = useUserStore.getState().isAuthenticated;
        if (isLoggedIn) {
          const { data } = await api.get("/cart");
          set({ items: data.cart.items, totalPrice: data.cart.totalPrice });
        } else {
          const { items } = get();
          const total = items.reduce(
            (sum, i) =>
              sum +
              (i.product?.price || 0) *
                i.quantity *
                (i.product?.area ? i.product?.area : 1),
            0
          );
          set({ totalPrice: total });
        }
      },

      addToCart: async (product) => {
        const isLoggedIn = useUserStore.getState().isAuthenticated;
        console.log(product);
        if (isLoggedIn) {
          const { data } = await api.post("/cart", {
            productId: product._id,
            quantity: product.quantity,
            area: product?.area,
            selectedColor: product?.selectedColor,
            selectedTexture: product?.selectedTexture,
            name: product?.name,
            image: product?.image || "",
          });
          set({ items: data.cart.items, totalPrice: data.cart.totalPrice });
        } else {
          const { items } = get();
          const existing = items.find((i) => i.productId === product._id);
          let updated: CartItem[];
          if (existing) {
            updated = items.map((i) =>
              i.productId === product._id
                ? { ...i, quantity: product.quantity, product: product }
                : i
            );
          } else {
            updated = [
              ...items,
              {
                productId: product._id,
                quantity: product.quantity ? product.quantity : 1,
                product,
              },
            ];
          }
          const total = updated.reduce(
            (sum, i) =>
              sum +
              (i.product?.price || 0) *
                i.quantity *
                (i.product?.area ? i.product?.area : 1),
            0
          );
          set({ items: updated, totalPrice: total });
        }
      },

      updateQuantity: async (productId, quantity) => {
        const isLoggedIn = useUserStore.getState().isAuthenticated;
        if (isLoggedIn) {
          const { data } = await api.put("/cart/update", {
            productId,
            quantity,
          });
          set({ items: data.items, totalPrice: data.totalPrice });
        } else {
          const { items } = get();
          const updated = items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          );
          const total = updated.reduce(
            (sum, i) => sum + (i.product?.price || 0) * i.quantity,
            0
          );
          set({ items: updated, totalPrice: total });
        }
      },

      removeCartItem: async (productId) => {
        const isLoggedIn = useUserStore.getState().isAuthenticated;
        if (isLoggedIn) {
          const { data } = await api.delete(`/cart/${productId}`);
          set({ items: data.items, totalPrice: data.totalPrice });
        } else {
          const { items } = get();
          const updated = items.filter((i) => i.productId !== productId);

          const total = updated.reduce(
            (sum, i) =>
              sum +
              (i.product?.price || 0) *
                i.quantity *
                (i.product?.area ? i.product?.area : 1),
            0
          );

          set({ items: updated, totalPrice: total });
        }
      },

      mergeCart: async () => {
        const { items } = get();
        const isLoggedIn = useUserStore.getState().isAuthenticated;

        if (!items.length || !isLoggedIn) return;

        const { data } = await api.post("/cart/merge", { guestCart: items });
        set({ items: data.cart.items, totalPrice: data.cart.totalPrice });
      },

      clearCart: () => set({ items: [], totalPrice: 0 }),
    }),
    {
      name: "cart-store",
      partialize: (state) => ({
        items: state.items,
        totalPrice: state.totalPrice,
      }),
    }
  )
);

export default useCartStore;
