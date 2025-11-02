import { ShoppingCart } from "lucide-react";
import type { ProductCardProps } from "../../types";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../store";

const ProductCard = ({ product, handleCart }: ProductCardProps) => {
  const navigate = useNavigate();
  const { items } = useCartStore();

  return (
    <div key={product._id}>
      <div className="bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative aspect-[3/4] group">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => {
              handleCart(product);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
              items?.find((item) => item.productId == product._id)
                ? "bg-brand text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 line-through">
              {product.discountedPrice && `₹ ${product.discountedPrice}`}
            </span>
            <span className="text-sm font-semibold text-gray-900">
              ₹ {product.price} /sq.ft.
            </span>
          </div>
        </div>
        <button
          onClick={() => navigate(`/product/${product._id}`)}
          className="py-2 px-4 text-brand hover:bg-brand-light hover:text-white transition-colors text-sm font-medium flex items-center gap-2"
        >
          Order
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
