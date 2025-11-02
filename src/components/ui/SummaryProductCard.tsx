import type { ProductCardItem } from "../../types";

const SummaryProductCard = ({
  item,
  quantity,
}: {
  item: ProductCardItem;
  quantity?: number;
}) => {
  console.log(item);
  return (
    <div key={item?._id} className="flex  flex-col md:flex-row gap-4">
      <div className=" w-full h-[200px] md:w-[150px] md:h-24 border-2 flex-shrink-0">
        <img
          src={item?.image || ""}
          alt={item.name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between mb-2">
          <h4 className="font-medium text-gray-900">{item.name}</h4>
          <span className="font-semibold text-gray-900">
            ₹{" "}
            {(
              item.price *
              (item.quantity ? item.quantity : quantity ? quantity : 1)
            ).toLocaleString()}
          </span>
        </div>
        <div className="text-sm text-gray-600 space-y-1">
          <p>Quantity: {item.quantity}</p>
          {item.area && <p>Area: {item.area} sq.ft</p>}
          {item.selectedColor && <p>Color: {item.selectedColor}</p>}
          {item.selectedTexture && <p>Texture: {item.selectedTexture}</p>}
        </div>
      </div>
    </div>
  );
};

export default SummaryProductCard;
