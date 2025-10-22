import React, { useEffect, useState } from "react";
import { ChevronRight, ShoppingCart } from "lucide-react";
import sortBy from "../../../public/sort_by.png";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";

// interface ProductGridProps {
//   products: Product[];
//   onProductClick: (product: Product) => void;
// }

const Home: React.FC = () => {
  const [cart, setCart] = useState<number[]>([]);
  const [product, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/product");
      console.log(data);
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-48">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-200 rounded">
              <img src={sortBy} alt="" />
            </button>
            <span className="text-sm text-gray-600">Sort by Latest</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-5">
          {product?.map((product: any) => (
            <div key={product._id}>
              <div className="bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative aspect-[3/4] group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                      cart.includes(product.id)
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
                      ₹ {product.originalPrice}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      ₹ {product.discountedPrice} /sq.ft.
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
          ))}
          {/* <div className="flex items-center  mt-5">
            <button>More Product</button>
            <ChevronRight />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
