interface ProductCardItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  selectedColor?: string;
  selectedTexture?: string;
  image?: string;
  area?: number;
  originalPrice?: number;
  discountedPrice?: number;
}
declare global {
  interface Window {
    Razorpay: any;
  }
}
interface OrderState {
  items: ProductCardItem[];
  totalAmount: number;
  cartFlag?: boolean;
  addItem: (item: ProductCardItem) => void;
  setItems: (items: ProductCardItem[]) => void;
  clearOrder: () => void;
}
interface ProductCardProps {
  product: ProductCardItem;
  handleCart: (item: any) => void;
}

interface OrderStore extends OrderState {
  myOrders: any[];
  getMyOrders: () => Promise<void>;
}
export type { OrderState, ProductCardProps, ProductCardItem, OrderStore };
