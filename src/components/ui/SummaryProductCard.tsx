import { Trash2 } from "lucide-react";
import type { ProductCardItem } from "../../types";

const SummaryProductCard = ({
  item,
  quantity,
  component,
  handleRemove,
}: {
  item: ProductCardItem;
  quantity?: number;
  component?: string;
  handleRemove?: () => void;
}) => {
  console.log(item);
  return (
    <div key={item?._id} className="flex p-2 flex-col md:flex-row gap-4">
      <div className="w-full overflow-hidden rounded-md  md:w-[150px] h-[200px] md:h-auto  flex-shrink-0">
        <img
          src={item?.image}
          alt={item?.name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between mb-2">
          <h4 className="font-medium text-gray-900">{item?.name}</h4>
          <span className="font-semibold text-gray-900">
            ₹{" "}
            {(
              item?.price *
              (item?.quantity ? item?.quantity : quantity ? quantity : 1) *
              (item?.area ? item?.area : 1)
            ).toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col text-sm text-gray-600 space-y-1">
          <div className="text-gray-600">
            <p>Quantity: {item?.quantity}</p>
            <p> Area :{item?.area == 0 ? 0 : item?.area}</p>
            {item?.selectedColor && <p>Color: {item?.selectedColor}</p>}
            {item?.selectedTexture && <p>Texture: {item?.selectedTexture}</p>}
          </div>
          {component == "cart" && (
            <button
              onClick={handleRemove}
              title="remove from cart"
              className="self-end hover:text-red-400"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SummaryProductCard;
