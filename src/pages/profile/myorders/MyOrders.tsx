import { useEffect } from "react";
import useOrderStore from "../../../store/useOrderStore";
import SummaryProductCard from "../../../components/ui/SummaryProductCard";

const MyOrders = () => {
  const { myOrders, getMyOrders } = useOrderStore();

  useEffect(() => {
    getMyOrders();
  }, [getMyOrders]);

  return (
    <div className=" w-[100%] h-full flex  ">
      <div className="mt-[150px] flex flex-col   flex-1">
        <h1 className="text-xl font-semibold ">My Orders</h1>

        {myOrders.length > 0 ? (
          myOrders.map((order) => (
            <div key={order._id} className="border p-3 rounded-lg">
              <h2 className="font-medium mb-2">Order #{order._id}</h2>
              {order.items.map((item: any, index: number) => (
                <SummaryProductCard
                  key={index}
                  item={item}
                  quantity={item.quantity}
                />
              ))}
              <p className="mt-2 font-semibold">
                Total: ₹{order.totalAmount.toFixed(2)}
              </p>
            </div>
          ))
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <h1 className=" text-black font-semibold text-3xl">
              No Orders found.
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
