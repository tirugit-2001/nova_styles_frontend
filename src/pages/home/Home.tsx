import React, { useEffect, useMemo, useRef, useState } from "react";

// import sortBy from "../../../public/sort_by.png";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import ProductCard from "../../components/ui/ProductCard";
import { ChevronRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

const Home: React.FC = () => {
  // const { items } = useCartStore();
  const [product, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const fetchedPages = useRef(new Set());
  const [trendingproducts, setTrendingProducts] = useState<any[]>([]);
  const limit = 12;
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

  useEffect(() => {
    fetchTrendingProducts();
  }, []);

  // Filter products where isTrending is true
  const trendingProductsList = useMemo(() => {
    const filtered = product.filter((product: any) => product.isTrending === true);
    console.log("trendingProductsList", filtered);
    return filtered;
  }, [product]);

  const applicationSections = useMemo(() => {
    const sections = [
      {
        title: "Kids & Playful Spaces",
        subtitle: "Latest design trends delivered the hassle-free way.",
        matchValues: ["Kids & Playful Spaces"],
        id: "kids-playful-spaces",
      },
      {
        title: "Heritage & Vintage Arts",
        subtitle: "Latest design trends delivered the hassle-free way.",
        // Match both "Heritage & Vintage Arts" and "Heritage & Vintage Art"
        matchValues: ["Heritage & Vintage Arts", "Heritage & Vintage Art"],
        id: "heritage-vintage-arts",
      },
      {
        title: "Indian Cultural Art – Pichwai",
        subtitle: "Latest design trends delivered the hassle-free way.",
        matchValues: ["Indian Cultural Art – Pichwai"],
        id: "indian-cultural-art-pichwai",
      },
      {
        title: "Tropical Nature & Leaves",
        subtitle: "Latest design trends delivered the hassle-free way.",
        matchValues: ["Tropical Nature & Leaves"],
        id: "tropical-nature-leaves",
      },
      {
        title: "Peacock Elegance Collection",
        subtitle: "Latest design trends delivered the hassle-free way.",
        // Match "Peacock Elegance Collection" and variations like "Peacock Elegance Collection Nature & Leaves"
        matchValues: ["Peacock Elegance Collection"],
        id: "peacock-elegance-collection",
      },
    ];

    const normalized = (value: string) => value.trim().toLowerCase();

    return sections.map((section) => ({
      ...section,
      products: product.filter((product: any) =>
        product.application?.some((applicationType: string) => {
          const normalizedApp = normalized(applicationType);
          return section.matchValues.some((matchValue: string) => {
            const normalizedMatch = normalized(matchValue);
            // Check if application contains the match value or vice versa (for partial matches)
            return normalizedApp === normalizedMatch || 
                   normalizedApp.includes(normalizedMatch) || 
                   normalizedMatch.includes(normalizedApp);
          });
        })
      ),
    }));
  }, [product]);

  // Handle hash-based navigation to scroll to sections
  useEffect(() => {
    const hash = window.location.hash.substring(1); // Remove the # symbol
    if (hash) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
  }, [product]); // Re-run when products are loaded
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
            <ProductCard key={product._id} handleCart={handleCart} product={product} />
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

      <div className="mx-auto my-20 max-w-7xl">
        <div >
          <h2 className="capitalize font-semibold">our trending products</h2>
          <p className="my-1">Our trending products are listed here.</p>
        </div>
        <div className="grid grid-cols-1 mt-6 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-5">
          {trendingProductsList.length > 0 ? (
            trendingProductsList.map((product: any) => (
              <ProductCard key={product._id} handleCart={handleCart} product={product} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full">
              No trending products available at the moment.
            </p>
          )}
        </div>
      </div>
      {
        trendingproducts.length > 0 && (
      <div className="mx-auto my-20 max-w-7xl">
        <div>
          <h2 className="capitalize font-semibold">
            Highest selling products
          </h2>
          <p className="my-1">
            Our highest selling products are listed here.
          </p>
        </div>
        <div className="grid grid-cols-1 mt-6 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-5">
          {trendingproducts?.map((product: any) => (
            <ProductCard key={product._id} handleCart={handleCart} product={product} />
          ))}
        </div>
      </div>
      )}
      {applicationSections
        .filter((section) => section.products.length > 0)
        .map((section) => (
          <div id={section.id} className="mx-auto my-20 max-w-7xl scroll-mt-20" key={section.title}>
            <div>
              <h2 className="capitalize font-semibold">{section.title}</h2>
              <p className="my-1">{section.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 mt-6 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-5">
              {section.products.map((product: any) => (
                <ProductCard key={product._id} handleCart={handleCart} product={product} />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Home;
