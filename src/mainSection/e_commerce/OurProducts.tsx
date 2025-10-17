import React, { useState } from 'react';
import { ChevronRight, ShoppingCart } from 'lucide-react';
import sortBy from '../../../public/sort_by.png'
import {  useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  pricePerSqFt: number;
}

// interface ProductGridProps {
//   products: Product[];
//   onProductClick: (product: Product) => void;
// }


const defaultProducts: Product[] = [
    {
      id: 1,
      name: "The Wind in the Willows",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      originalPrice: 350,
      discountedPrice: 263,
      pricePerSqFt: 263
    },
    {
      id: 2,
      name: "The Wind in the Willows",
      image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=400&h=400&fit=crop",
      originalPrice: 350,
      discountedPrice: 263,
      pricePerSqFt: 263
    },
    {
      id: 3,
      name: "The Wind in the Willows",
      image: "https://images.unsplash.com/photo-1560015534-cee980ba7e13?w=400&h=400&fit=crop",
      originalPrice: 350,
      discountedPrice: 263,
      pricePerSqFt: 263
    },
    {
      id: 4,
      name: "The Wind in the Willows",
      image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&h=400&fit=crop",
      originalPrice: 350,
      discountedPrice: 263,
      pricePerSqFt: 263
    },
    {
      id: 5,
      name: "The Wind in the Willows",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      originalPrice: 350,
      discountedPrice: 263,
      pricePerSqFt: 263
    },
    {
      id: 6,
      name: "The Wind in the Willows",
      image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=400&h=400&fit=crop",
      originalPrice: 350,
      discountedPrice: 263,
      pricePerSqFt: 263
    },
    {
      id: 7,
      name: "The Wind in the Willows",
      image: "https://images.unsplash.com/photo-1560015534-cee980ba7e13?w=400&h=400&fit=crop",
      originalPrice: 350,
      discountedPrice: 263,
      pricePerSqFt: 263
    },
    {
      id: 8,
      name: "The Wind in the Willows",
      image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&h=400&fit=crop",
      originalPrice: 350,
      discountedPrice: 263,
      pricePerSqFt: 263
    }
  ];


const WallpaperGrid: React.FC = () => {
  const [cart, setCart] = useState<number[]>([]);
  const navigate = useNavigate()

  const toggleCart = (id: number) => {
    setCart(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-48">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-200 rounded">
              <img src={sortBy} alt=""  />
            </button>
            <span className="text-sm text-gray-600">Sort by Latest</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-5">
          {defaultProducts.map((product) => (
            <div key={product.id}>
              <div className="bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative aspect-[3/4] group">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <button 
                    onClick={() => toggleCart(product.id)}
                    className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                      cart.includes(product.id) 
                        ? 'bg-brand text-white' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-1">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 line-through">₹ {product.originalPrice}</span>
                    <span className="text-sm font-semibold text-gray-900">₹ {product.discountedPrice} /sq.ft.</span>
                  </div>
                </div>
                <button
                onClick={() => navigate(`/product/1`)}
                 className="py-2 px-4 text-brand hover:bg-brand-light hover:text-white transition-colors text-sm font-medium flex items-center gap-2">
                  Order
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
          <div className='flex items-center  mt-5'>
          <button>
            More Product  
          </button>
          <ChevronRight />
          </div>
        </div>
        <div className='mt-10'>
            <h2 className='font-medium text-lg'>Tending Home Interior Sofas</h2>
            <p className='font-normal text-base'>Latest dream home interiors delivered the hassle-free way</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-5">
          {defaultProducts.map((product) => (
            <div key={product.id}>
              <div className="bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative aspect-[3/4] group">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <button 
                    onClick={() => toggleCart(product.id)}
                    className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                      cart.includes(product.id) 
                        ? 'bg-brand text-white' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-1">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 line-through">₹ {product.originalPrice}</span>
                    <span className="text-sm font-semibold text-gray-900">₹ {product.discountedPrice} /sq.ft.</span>
                  </div>
                </div>
                <button 
                onClick={() => navigate(`/product/1`)}
                className="py-2 px-4 text-brand hover:bg-brand-light hover:text-white transition-colors text-sm font-medium flex items-center gap-2">
                  Order
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
          <div className='flex items-center  mt-5'>
          <button>
            More Product  
          </button>
          <ChevronRight />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default WallpaperGrid;