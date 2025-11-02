import React, { useEffect, useState } from "react";
import { ChevronRight, ShoppingCart } from "lucide-react";
import sortBy from "../../../public/sort_by.png";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import { useCartStore } from "../../store";
import ProductCard from "../../components/ui/ProductCard";

// interface ProductGridProps {
//   products: Product[];
//   onProductClick: (product: Product) => void;
// }

const Home: React.FC = () => {
  const { addToCart, items, removeCartItem } = useCartStore();
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
  // const handleCart = (cartData: any) => {
  //   console.log(cartData);
  //   const existing = items.find((item) => item.productId == cartData._id);
  //   if (existing) {
  //     removeCartItem(cartData._id);
  //   } else {
  //     addToCart(cartData);
  //   }
  // };
  const handleCart = (cartData: any) => {
    navigate(`/product/${cartData._id}`);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(items);
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
            <ProductCard handleCart={handleCart} product={product} />
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
