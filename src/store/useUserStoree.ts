import { create } from "zustand";
import api from "../service/api";

interface Address {
  _id: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

interface UserState {
  userAddresses: Address[];
  loading: boolean;
  error: string | null;
  getAddresses: () => Promise<void>;
}

const useUserStore = create<UserState>((set) => ({
  userAddresses: [],
  loading: false,
  error: null,

  getAddresses: async () => {
    set({ loading: true, error: null });
    try {
      const { data, status } = await api.get("/users/address");
      if (status == 200) {
        set({ userAddresses: data.address || [] });
      }
    } catch (err: any) {
      console.error("Error fetching addresses:", err);
      set({
        userAddresses: [],
        error: err?.response?.data?.message || "Failed to load addresses",
      });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useUserStore;
