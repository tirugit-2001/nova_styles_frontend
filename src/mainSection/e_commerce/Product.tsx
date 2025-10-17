import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import type { ProductAdminModel } from '../Admin/AdminComponents/ProductAdmin';

const ProductDetail: React.FC = () => {
  const [selectedTexture, setSelectedTexture] = useState<string>('Paper Texture');
  const [selectedColor, setSelectedColor] = useState<string>('Ash');
  const [area, setArea] = useState<string>('0');
  const [quantity, setQuantity] = useState<number>(5);
  const [showDetails, setShowDetails] = useState<boolean>(true);
  const [products, setProducts] = useState<ProductAdminModel[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const stored = localStorage.getItem("productData");
    if (stored) {
      setProducts(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const updated = localStorage.getItem("productData");
      if (updated) setProducts(JSON.parse(updated));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const product = products.find(p => p.id === id);

  // handle product not found
  if (!product) {
    return (
      <div className="p-6 mt-56">
        <button 
          onClick={() => navigate(-1)} 
          className="mb-6 text-gray-600 hover:text-gray-900"
        >
          ← Back
        </button>
        <p className="text-red-500">Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleOrder = () => {
    addToCart(product); // make sure it's in the cart
    navigate('/checkout');
  };

  const textures = ['Feather', 'Canvas', 'Silk'];
  const colors = ['Ash', 'Red'];

  const calculateTotal = () => {
    const sqFt = parseFloat(area) || 0;
    const pricePerSqFt = parseFloat(product.pricePersqrFeet) || 0;
    return sqFt * pricePerSqFt;
  };

  const discountPercentage = () => {
    const original = parseFloat(product.originalPrice) || 0;
    const discounted = parseFloat(product.discountedPrice) || 0;
    if (original === 0) return 0;
    return Math.round(((original - discounted) / original) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-56">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="">
            <div className="relative shadow-sm overflow-hidden">
              {discountPercentage() > 0 && (
                <div className="absolute top-36 left-0 bg-brand text-white px-4 py-1 text-sm font-medium rotate-[-90deg] origin-top-left">
                  <span className='m-6'>{discountPercentage()}% OFF</span> 
                </div>
              )}
              <img 
                src={product.image} 
                alt={product.name}
                className="w-3/4 h-auto object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="shadow-sm p-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center gap-3 mb-4">
              <p className="text-2xl font-medium text-gray-900">
                ₹ {parseFloat(product.discountedPrice).toLocaleString()}
              </p>
              {parseFloat(product.originalPrice) > parseFloat(product.discountedPrice) && (
                <p className="text-lg text-gray-500 line-through">
                  ₹ {parseFloat(product.originalPrice).toLocaleString()}
                </p>
              )}
            </div>
            <p className="text-gray-900 font-normal mb-6">{product.description}</p>

            {/* Paper Texture Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Paper Texture</h3>
              <div className="grid grid-cols-3 gap-3">
                {textures.map((texture) => (
                  <button
                    key={texture}
                    onClick={() => setSelectedTexture(texture)}
                    className={`py-2 px-3 border text-sm ${
                      selectedTexture === texture
                        ? 'border-brand bg-brand text-white'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {texture}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Colour</h3>
              <div className="grid grid-cols-2 gap-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`py-2 px-3 border text-sm flex items-center gap-2 ${
                      selectedColor === color
                        ? 'border-brand bg-brand-light'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <span className="text-gray-700">{color}</span>
                    <span className={`w-6 h-6 rounded ${color === 'Ash' ? 'bg-gray-400' : 'bg-red-600'}`}></span>
                  </button>
                ))}
              </div>
            </div>

            {/* Area Input */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Enter Area (sq. ft)</h3>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="flex-1 border border-gray-300 rounded px-4 py-2 text-gray-900"
                  placeholder="0"
                  min="0"
                />
                <div className="text-xl font-bold text-gray-900 min-w-[150px] text-right">
                  ₹ {calculateTotal().toLocaleString()}
                </div>
              </div>
            </div>

            {/* Quantity Selector and Action Buttons */}
            <div className="flex items-center gap-4 mb-6">
              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                >
                  −
                </button>
                <span className="text-lg font-medium text-gray-900 min-w-[30px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>

              {/* Action Buttons */}
              <button 
                className="flex-1 py-3 px-6 bg-white border border-brand text-brand hover:bg-orange-50 transition-colors font-medium"
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
              <button
                onClick={handleOrder}
                className="flex-1 py-3 px-6 bg-brand text-white hover:bg-brand-dark transition-colors font-medium"
              >
                Order
              </button>
            </div>

            {/* Product Details Accordion */}
            <div className="border-t border-gray-200 pt-4">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="text-lg font-medium text-gray-900">Product Details</h3>
                {showDetails ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              
              {showDetails && (
                <div className="mt-4 space-y-4 text-sm text-gray-700">
                  <div>
                    <h4 className="font-semibold mb-2">Material:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Non self Adhesive</li>
                      <li>Non woven wallpaper</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Quantity:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Number of panels shall depend on the wall size</li>
                      <li>Wallpaper is printed in multiple panels and parts</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Print:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Digitally printed</li>
                      <li>Eco-friendly & child safe inks</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Installation:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Additional charges may be applicable for areas outside serviced pin codes</li>
                      <li>Free installation is in select cities; please message our Customer Care</li>
                      <li>Professional installation required for all wallpapers.</li>
                      <li>Seamless joints post-installation for feather and leather finish</li>
                      <li>Semi Seamless joints post installation for silk and canvas finish</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Application:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Oil-based paint or primer applied atleast 5 days prior to installation for best finish</li>
                      <li>Smooth finished walls; wood; or MDF panels</li>
                      <li>Indoor areas not exposed to direct sunlight or weather</li>
                    </ul>
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