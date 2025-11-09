import React, { useEffect, useState } from "react";
import { AlertCircle, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useCartStore, useOrderStore } from "../../store";
import { toast } from "sonner";
import api from "../../service/api";

const ProductDetail: React.FC = () => {
  const [selectedTexture, setSelectedTexture] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [area, setArea] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [showDetails, setShowDetails] = useState<boolean>(true);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState<string>("0");

  const [actionLoading, setActionLoading] = useState<{
    cart: boolean;
    order: boolean;
  }>({ cart: false, order: false });
  const { addItem } = useOrderStore();
  const { addToCart } = useCartStore();

  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get(`/product/${id}`);
      console.log(data);
      if (data) {
        setProduct(data);
        setTotalPrice(data.price.toFixed(2));
        setSelectedTexture(data?.paperTextures?.[0] || "");
        setSelectedColor(data?.colours?.[0] || "");
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Failed to load product details";
      setError(errorMessage);
      console.error("Fetch product error:", error);
      toast.error(errorMessage, {
        style: { color: "red" },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = () => {
    console.log("Order placed:", {
      productId: product._id,
      texture: selectedTexture,
      color: selectedColor,
      area,
      quantity,
    });
    setActionLoading({ ...actionLoading, order: true });
    addItem({
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity,
      selectedColor,
      selectedTexture,
      area,
      image: product.image,
    });
    setActionLoading({ ...actionLoading, order: false });
    navigate("/checkout");
  };

  const handleCart = async () => {
    console.log("produciuufid");
    console.log(product);
    try {
      setActionLoading({ ...actionLoading, cart: true });

      await addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity,
        selectedColor,
        selectedTexture,
        area,
        image: product.image,
      });
      toast.success("Item added to cart successfully", {
        style: {
          color: "green",
        },
      });
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Something went wrong";
      toast.error(msg, {
        style: { color: "red" },
      });
    } finally {
      setActionLoading({ ...actionLoading, cart: false });
    }
  };
  const calculateTotalPrice = () => {
    if (area !== 0) {
      setTotalPrice((Number(area) * product?.price * quantity).toFixed(2));
      return (Number(area) * product?.price * quantity).toFixed(2);
    } else {
      setTotalPrice((Number(product?.price) * quantity).toFixed(2));
      return (Number(product?.price) * quantity).toFixed(2);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);
  useEffect(() => {
    calculateTotalPrice();
  }, [area, quantity]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-600">
        <Loader2 className="w-12 h-12 animate-spin text-brand mb-4" />
        <p className="text-lg">Loading product details...</p>
      </div>
    );
  }
  if (error && !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              Go Back
            </button>
            <button
              onClick={fetchProductDetails}
              className="px-6 py-2 bg-brand text-white rounded hover:bg-brand-dark transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (!product && !loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-brand text-white rounded hover:bg-brand-dark transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-32">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-white rounded shadow-sm p-4">
            <img
              src={
                product?.image ||
                "https://via.placeholder.com/500x500?text=No+Image"
              }
              alt={product?.name}
              className="w-3/4 h-auto object-cover rounded"
            />
          </div>

          {/* Product Details */}
          <div className="shadow-sm bg-white p-6 rounded">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              {product?.name}
            </h1>
            <p className="text-gray-700 mb-4">{product?.description}</p>
            <p className="text-2xl font-medium text-brand mb-6">
              ₹ {product?.price.toLocaleString()}
            </p>

            {/* Paper Texture */}
            {product?.paperTextures?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Paper Texture
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {product?.paperTextures?.map((texture: string) => (
                    <button
                      key={texture}
                      onClick={() => setSelectedTexture(texture)}
                      className={`py-2 px-3 border text-sm rounded ${
                        selectedTexture === texture
                          ? "border-brand bg-brand text-white"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {texture}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product?.colours?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Colour
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {product?.colours.map((color: string) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`py-2 px-3 border text-sm flex items-center gap-2 rounded ${
                        selectedColor === color
                          ? "border-brand bg-orange-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <span className="text-gray-700">{color}</span>
                      <span className="w-6 h-6 rounded-full border bg-gray-200"></span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Area Input */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Enter Area (sq. ft)
              </h3>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={area}
                  disabled={actionLoading.cart || actionLoading.order}
                  onChange={(e) =>
                    setArea(e.target.value ? Number(e.target.value) : 0)
                  }
                  className="flex-1 border border-gray-300 rounded px-4 py-2 text-gray-900"
                  placeholder="0"
                  min="0"
                />
                <div className="text-xl font-bold text-gray-900 min-w-[150px] text-right">
                  ₹ {totalPrice}
                </div>
              </div>
            </div>

            {/* Quantity Selector & Buttons */}
            {quantity == 0 ? (
              <div>
                <h2 className="text-xl font-semibold">Out of Stock</h2>
              </div>
            ) : (
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <button
                    disabled={actionLoading.cart || actionLoading.order}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                  >
                    −
                  </button>
                  <span className="text-lg font-medium text-gray-900 min-w-[30px] text-center">
                    {quantity}
                  </span>
                  <button
                    disabled={actionLoading.cart || actionLoading.order}
                    onClick={() =>
                      setQuantity(Math.min(product?.stock, quantity + 1))
                    }
                    className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>

                <button
                  className="flex-1 py-3 px-6 bg-white border border-brand text-brand hover:bg-orange-50 transition-colors font-medium rounded"
                  onClick={handleCart}
                  disabled={actionLoading.cart || actionLoading.order}
                >
                  {actionLoading.cart ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    "Add to Cart"
                  )}
                </button>
                <button
                  disabled={actionLoading.cart || actionLoading.order}
                  onClick={handleOrder}
                  className="flex-1 py-3 px-6 bg-brand text-white hover:bg-brand-dark transition-colors font-medium rounded"
                >
                  {actionLoading.order ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Order"
                  )}
                </button>
              </div>
            )}

            {/* Product Details Accordion */}
            <div className="border-t border-gray-200 pt-4">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="text-lg font-medium text-gray-900">
                  Product Details
                </h3>
                {showDetails ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              {showDetails && (
                <div className="mt-4 space-y-4 text-sm text-gray-700">
                  <div>
                    <h4 className="font-semibold mb-2">Material:</h4>
                    <ul className="list-disc list-inside">
                      {product?.material?.map((m: string) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Print:</h4>
                    <ul className="list-disc list-inside">
                      {product?.print?.map((p: string) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Installation:</h4>
                    <ul className="list-disc list-inside">
                      {product?.installation?.map((i: string) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Application:</h4>
                    <ul className="list-disc list-inside">
                      {product?.application?.map((a: string) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Stock:</h4>
                    <p>{product?.stock} available</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
