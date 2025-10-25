import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  selectedColor?: string;
  selectedTexture?: string;
  image?: string;
  area?: number;
}

interface OrderState {
  items: OrderItem[];
  totalAmount: number;
  addItem: (item: OrderItem) => void;
  setItems: (items: OrderItem[]) => void;
  clearOrder: () => void;
}

const useOrderStore = create<OrderState>()(
  persist(
    (set, _) => ({
      items: [],
      totalAmount: 0,
      addItem: (item: OrderItem) => {
        const newItems = [item];
        const totalAmount = newItems.reduce(
          (sum, i) => sum + i.price * i.quantity * (i.area || 1),
          0
        );
        set({ items: newItems, totalAmount });
      },
      setItems: (items: OrderItem[]) => {
        const totalAmount = items.reduce(
          (sum, i) => sum + i.price * i.quantity * (i.area || 1),
          0
        );
        set({ items, totalAmount });
      },
      clearOrder: () => set({ items: [], totalAmount: 0 }),
    }),
    { name: "order-storage" }
  )
);

export default useOrderStore;
