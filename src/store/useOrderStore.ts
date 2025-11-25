import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { OrderState, ProductCardItem } from "../types";

const useOrderStore = create<OrderState>()(
  persist(
    (set, _) => ({
      items: [],
      totalAmount: 0,
      cartFlag: false,
      addItem: (item: ProductCardItem) => {
        const newItems = [item];
        const totalAmount = newItems.reduce(
          (sum, i) => sum + i.price * i.quantity * (i.area || 1),
          0
        );
        set({ items: newItems, cartFlag: false, totalAmount });
      },
      setItems: (items: ProductCardItem[]) => {
        console.log(items);
        const totalAmount = items.reduce(
          (sum, i) => sum + i.price * i.quantity * (i?.area || 1),
          0
        );
        set({ items, cartFlag: true, totalAmount });
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
