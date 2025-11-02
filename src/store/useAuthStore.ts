import { create } from "zustand";
import api from "../service/api";

import useCartStore from "./useCartStore";

interface User {
  username: string;
  email: string;
  phone: number;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isRegistered: boolean;
  loading: boolean;
  error: string | null;
  register: (
    name: string,
    phone: string,
    email: string,
    password: string
  ) => Promise<any>;
  login: (email: string, password: string, deviceId: string) => Promise<any>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setUser: (user: User) => void;
}

const useAuthStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  isRegistered: false,
  error: null,
  setUser: (user) => set({ user, isAuthenticated: true }),

  register: async (
    name: string,
    phone: string,
    email: string,
    password: string
  ) => {
    set({ loading: true, error: null });
    try {
      const { status } = await api.post("/auth/register", {
        name,
        phone,
        email,
        password,
      });
      if (status === 201) {
        set({ isRegistered: true });
        return true;
      }
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Registration failed",
        isAuthenticated: false,
      });
    } finally {
      set({ loading: false });
    }
  },

  login: async (email, password, deviceId) => {
    set({ loading: true, error: null });

    try {
      const { status } = await api.post("/auth/login", {
        email,
        password,
        deviceId,
      });

      if (status === 200) {
        useAuthStore.getInitialState().checkAuth();
      }
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Login failed",
        isAuthenticated: false,
      });
      return false;
    } finally {
      set({ loading: false });
    }

    try {
      const cartStore = useCartStore.getState();
      if (cartStore.items.length !== 0) {
        await cartStore.mergeCart();
      }
      await cartStore.loadCart();
    } catch (cartErr) {
      console.error("Cart merging failed but login succeeded:", cartErr);
    }

    return true;
  },

  logout: async () => {
    set({ loading: true });

    try {
      const { status } = await api.post("/auth/logout");
      if (status == 200) {
        set({ user: null, isAuthenticated: false });
      }
    } catch (err) {
      console.log("Logout error:", err);
    } finally {
      set({ loading: false });
    }
  },

  checkAuth: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get("/auth/check-session");
      set({ user: data.user_info, isAuthenticated: true });
    } catch (err) {
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ loading: false });
    }
  },
  getAddress: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get("/auth/check-session");
      set({ user: data, isAuthenticated: true });
    } catch (err) {
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAuthStore;
