import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { OrderStore, ProductCardItem } from "../types";
import api from "../service/api";

const useOrderStore = create<OrderStore>()(
  persist(
    (set, _) => ({
      items: [],
      totalAmount: 0,
      addItem: (item: ProductCardItem) => {
        const newItems = [item];
        const totalAmount = newItems.reduce(
          (sum, i) => sum + i.price * i.quantity * (i.area || 1),
          0
        );
        set({ items: newItems, totalAmount });
      },
      setItems: (items: ProductCardItem[]) => {
        console.log(items);
        const totalAmount = items.reduce(
          (sum, i) => sum + i.price * i.quantity * (i?.area || 1),
          0
        );
        set({ items, totalAmount });
      },

      myOrders: [],
      getMyOrders: async () => {
        try {
          const res = await api.get("/orders/my");
          set({ myOrders: res.data.orders });
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        }
      },

      clearOrder: () => set({ items: [], totalAmount: 0 }),
    }),
    {
      name: "order-storage",
      partialize: (state) => ({
        items: state.items,
        totalAmount: state.totalAmount,
      }),
    }
  )
);

export default useOrderStore;
