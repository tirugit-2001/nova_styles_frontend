import { create } from "zustand";
import api from "../service/api";

interface CartItem {
  productId: string;
  quantity: number;
  product?: {
    _id: string;
    name: string;
    price: number;
    image?: string;
  };
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
  loadCart: (user: any) => Promise<void>;
  addToCart: (product: any, user: any) => Promise<void>;
  updateQuantity: (
    productId: string,
    quantity: number,
    user: any
  ) => Promise<void>;
  removeItem: (productId: string, user: any) => Promise<void>;
  mergeCart: (user: any) => Promise<void>;
}

const useCartStore = create<CartState>((set, _) => ({
  items: [],
  totalPrice: 0,

  loadCart: async (user) => {
    if (user?.token) {
      const { data } = await api.get("/cart");
      set({ items: data.cart.items, totalPrice: data.cart.totalPrice });
    } else {
      const local = JSON.parse(localStorage.getItem("cart") || "[]");
      const total = local.reduce(
        (sum: number, i: any) => sum + (i.product?.price || 0) * i.quantity,
        0
      );
      set({ items: local, totalPrice: total });
    }
  },

  addToCart: async (product, user) => {
    if (user?.token) {
      const { data } = await api.post("/cart", {
        productId: product._id,
        quantity: 1,
      });
      set({ items: data.cart.items, totalPrice: data.cart.totalPrice });
    } else {
      let local = JSON.parse(localStorage.getItem("cart") || "[]");
      const existing = local.find((i: any) => i?.productId === product._id);
      if (existing) existing.quantity += 1;
      else local.push({ productId: product._id, quantity: 1, product });
      localStorage.setItem("cart", JSON.stringify(local));
      const total = local.reduce(
        (sum: number, i: any) => sum + (i.product?.price || 0) * i.quantity,
        0
      );
      set({ items: local, totalPrice: total });
    }
  },

  updateQuantity: async (productId, quantity, user) => {
    if (user?.token) {
      const { data } = await api.put("/cart/update", { productId, quantity });
      set({ items: data.cart.items, totalPrice: data.cart.totalPrice });
    } else {
      let local = JSON.parse(localStorage.getItem("cart") || "[]");
      local = local.map((i: any) =>
        i.productId === productId ? { ...i, quantity } : i
      );
      localStorage.setItem("cart", JSON.stringify(local));
      const total = local.reduce(
        (sum: number, i: any) => sum + (i.product?.price || 0) * i.quantity,
        0
      );
      set({ items: local, totalPrice: total });
    }
  },

  removeItem: async (productId, user) => {
    if (user?.token) {
      const { data } = await api.delete(`/cart/${productId}`);
      set({ items: data.cart.items, totalPrice: data.cart.totalPrice });
    } else {
      let local = JSON.parse(localStorage.getItem("cart") || "[]");
      local = local.filter((i: any) => i.productId !== productId);
      localStorage.setItem("cart", JSON.stringify(local));
      const total = local.reduce(
        (sum: number, i: any) => sum + (i.product?.price || 0) * i.quantity,
        0
      );
      set({ items: local, totalPrice: total });
    }
  },

  mergeCart: async (user) => {
    const guestCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!guestCart.length || !user?.token) return;

    const { data } = await api.post("/cart/merge", { guestCart });
    localStorage.removeItem("cart");
    set({ items: data.cart.items, totalPrice: data.cart.totalPrice });
  },
}));

export default useCartStore;
