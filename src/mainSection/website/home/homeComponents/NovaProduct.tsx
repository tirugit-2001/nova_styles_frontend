import React from 'react';
import { ArrowRight } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  image: string;
  originalPrice: number;
  salePrice: number;
  pricePerSqFt: string;
}

interface NovaProductProps {
  product?: Product;
}

const NovaProduct: React.FC<NovaProductProps> = ({ product }) => {
  const defaultProduct: Product = {
    id: 1,
    title: 'The Wind in the Willows',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800&q=80',
    originalPrice: 350,
    salePrice: 263,
    pricePerSqFt: '/sq.ft.'
  };

  const prod = product || defaultProduct;

  return (
    <div className="w-72 bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <img
          src={prod.image}
          alt={prod.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="p-4 flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-gray-900 text-base font-normal mb-2">
            {prod.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm line-through">
              ₹ {prod.originalPrice}
            </span>
            <span className="text-gray-900 text-base font-medium">
              ₹ {prod.salePrice} {prod.pricePerSqFt}
            </span>
          </div>
        </div>
        
        <button className="flex items-center gap-1 text-gray-500 hover:text-gray-900 transition-colors text-sm font-normal">
          Order
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Demo section showing multiple products
const NovaProductDemo: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      title: 'The Wind in the Willows',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800&q=80',
      originalPrice: 350,
      salePrice: 263,
      pricePerSqFt: '/sq.ft.'
    },
    {
      id: 2,
      title: 'The Wind in the Willows',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      originalPrice: 350,
      salePrice: 263,
      pricePerSqFt: '/sq.ft.'
    },
    {
      id: 3,
      title: 'The Wind in the Willows',
      image: 'https://images.unsplash.com/photo-1567225591450-74a2b5bbab63?w=800&q=80',
      originalPrice: 350,
      salePrice: 263,
      pricePerSqFt: '/sq.ft.'
    },
    {
      id: 4,
      title: 'The Wind in the Willows',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
      originalPrice: 350,
      salePrice: 263,
      pricePerSqFt: '/sq.ft.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-medium text-gray-900 mb-2">
            Trending Home Interior Wallpapers
          </h1>
          <p className="text-gray-600 text-xl">
            Latest dream home interiors delivered the hassle-free way
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-24 ">
          {products.map(product => (
            <NovaProduct key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NovaProductDemo;