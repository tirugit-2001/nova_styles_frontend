import React, { useEffect, useRef, useState } from "react";

// import sortBy from "../../../public/sort_by.png";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import { useCartStore } from "../../store";
import ProductCard from "../../components/ui/ProductCard";
import { ChevronRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

const Home: React.FC = () => {
  const { items } = useCartStore();
  const [product, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const fetchedPages = useRef(new Set());
  const [trendingproducts, setTrendingProducts] = useState<any[]>([]);
  const limit = 4;
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  const fetchProducts = async () => {
    if (fetchedPages.current.has(page)) return;
    fetchedPages.current.add(page);

    setLoading(true);
    try {
      const { data } = await api.get(`/product?page=${page}&limit=${limit}`);
      if (data.success) {
        setProducts((prev) => [...prev, ...data.products]);
        setHasMore(data.hasMore);
      }
    } finally {
      setLoading(false);
    }
  };
  const fetchTrendingProducts = async () => {
    try {
      const { data, status } = await api.get("/product/trending");
      console.log(data);
      if (status == 200) {
        setTrendingProducts(data.products);
      }
    } catch (e) {
      console.log(e);
      toast.error("Failed to fetch trending products");
    }
  };

  console.log("products", product);
  const handleCart = (cartData: any) => {
    navigate(`/product/${cartData._id}`);
  };

  const scrollPositionRef = useRef(0);

  const handleLoadMore = () => {
    scrollPositionRef.current = window.scrollY;
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (page > 1 && loadMoreRef.current) {
      loadMoreRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [product]);
  useEffect(() => {
    console.log("fetching products for page:", page);
    fetchProducts();
  }, [page]);
  console.log(items);

  useEffect(() => {
    fetchTrendingProducts();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {loading && (
        <div className="flex h-full w-full justify-center items-center mb-4">
          <Loader2 className="w-6 h-6 animate-spin text-brand" />
        </div>
      )}
      <div className="max-w-7xl mx-auto">
        {/* <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-200 rounded">
              <img src={sortBy} alt="" />
            </button>
            <span className="text-sm text-gray-600">Sort by Latest</span>
          </div>
        </div> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-5">
          {product?.map((product: any) => (
            <ProductCard handleCart={handleCart} product={product} />
          ))}
        </div>
        {hasMore && (
          <div
            ref={loadMoreRef}
            className="flex justify-center items-center my-6"
          >
            <button
              onClick={handleLoadMore}
              className="text-brand flex items-center gap-1"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin text-brand" />
              ) : (
                <>
                  More Products
                  <ChevronRight className="text-brand" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
      <div className="mx-auto my-7 max-w-7xl">
        <div className=" ">
          <h2 className="capitalize font-semibold">
            Trending Home Interior Wallpapers
          </h2>
          <p className="my-1">
            Latest dream home interiors delivered the hassle-free way
          </p>
        </div>
        <div className="grid grid-cols-1 mt-6 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-5">
          {trendingproducts?.map((product: any) => (
            <ProductCard handleCart={handleCart} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
