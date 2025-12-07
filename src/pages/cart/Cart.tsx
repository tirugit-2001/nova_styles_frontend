import Button from "../../components/ui/Button";
import SummaryProductCard from "../../components/ui/SummaryProductCard";
import { useCartStore, useOrderStore } from "../../store";
import type { ProductCardItem } from "../../types";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { removeCartItem } = useCartStore();
  const { items, totalPrice } = useCartStore();

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
  const handleItemRemove = (productId: string) => {
    removeCartItem(productId);
  };
  console.log("cart items", items);
  return (
    <>
      {items?.length > 0 ? (
        <div className="flex flex-col md:flex-row  border-2 p-5 gap-8  min-h-screen">
          <div className="flex-1 ">
            <h3 className="font-semibold">Order Summary</h3>
            <div className="flex my-4  flex-col gap-4">
              {items?.map((item: any) => (
                <div>
                  <SummaryProductCard
                    isAvailable={item?.isAvailable ?? true}
                    component="cart"
                    handleRemove={() => {
                      handleItemRemove(item?.productId);
                    }}
                    item={item?.product}
                    quantity={item?.quantity}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex  justify-between flex-row">
              <div>
                <p className="text-lg font-medium">Total</p>
                <p className="text-gray-600 text-sm">Including </p>
              </div>
              <h4 className="font-semibold text-gray-900">
                {" "}
                ₹ {totalPrice?.toLocaleString()}
              </h4>
            </div>
            <Button btnTitle="Order" handleClick={handleOrder} />
          </div>
        </div>
      ) : (
        <div className=" h-screen w-full flex items-center justify-center ">
          <h1 className="text-xl">Cart is empty</h1>
        </div>
      )}
    </>
  );
};

export default Cart;
