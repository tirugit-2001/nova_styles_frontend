import { create } from "zustand";
import api from "../service/api";
import { jwtDecode } from "jwt-decode";

interface User {
  username: string;
  email: string;
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

const useUserStore = create<UserState>((set) => ({
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
      const { status, data } = await api.post("/auth/login", {
        email,
        password,
        deviceId,
      });
      console.log(data);

      if (status === 200) {
        const token = data.result.accessToken; //
        const decoded: { username: string; email: string } = jwtDecode(token);
        console.log("Decoded token:", decoded);
        set({ user: decoded, isAuthenticated: true });
        return true;
      }
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Login failed",
        isAuthenticated: false,
      });
    } finally {
      set({ loading: false });
    }
  },
  logout: async () => {
    set({ loading: true });

    try {
      await api.post("/auth/logout");
      set({ user: null, isAuthenticated: false });
    } catch (err) {
      console.log("Logout error:", err);
    } finally {
      set({ loading: false });
    }
  },

  checkAuth: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get("/auth/me");
      set({ user: data, isAuthenticated: true });
    } catch (err) {
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useUserStore;
