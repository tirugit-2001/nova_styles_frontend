import Button from "../../components/ui/Button";
import SummaryProductCard from "../../components/ui/SummaryProductCard";
import { useCartStore, useOrderStore } from "../../store";
import type { ProductCardItem } from "../../types";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const { items, totalPrice } = useCartStore();

  console.log(totalPrice);
  const { setItems } = useOrderStore();
  console.log(items);
  const handleOrder = () => {
    const data = items
      .map((itm) => itm.product)
      .filter((p): p is ProductCardItem => p !== undefined);

    if (data.length > 0) {
      setItems(data);
    }
    navigate("/checkout");
  };
  return (
    <div className="flex flex-col md:flex-row py-[182px] px-5 gap-5  min-h-screen">
      <div className="flex-1">
        <h3 className="font-semibold">Order Summary</h3>
        <div className="flex my-4  flex-col gap-4">
          {items?.map((item: any) => (
            <SummaryProductCard item={item.product} quantity={item.quantity} />
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex  justify-between flex-row">
          <div>
            <p className="text-lg font-medium"> Total</p>
            <p className="text-gray-600 text-sm">Including </p>
          </div>
          <h4 className="font-semibold text-gray-900"> ₹ {totalPrice}</h4>
        </div>
        <Button btnTitle="Order" handleClick={handleOrder} />
      </div>
    </div>
  );
};

export default Cart;
