import React from 'react';

interface CustomProductProps {
  title?: string;
  subtitle?: string;
  startingPrice?: number;
  buttonText?: string;
  imageUrl?: string;
  onButtonClick?: () => void;
}

const CustomProduct: React.FC<CustomProductProps> = ({
  title = "Bring Your Own Design Into Life",
  subtitle = "Latest dream home interiors delivered the hassle-free way",
  startingPrice = 450,
  buttonText = "Explore Our Products",
  imageUrl = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80",
  onButtonClick
}) => {
  return (
    <div className="w-full   bg-white">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">
              {title}
            </h3>
            <p className="text-gray-600 text-xl" >
              {subtitle}
            </p>
            <p className="text-gray-900 text-base font-medium">
              Starting ₹{startingPrice}
            </p>
            <button
              onClick={onButtonClick}
              className="bg-brand hover:bg-brand-dark text-white px-12 py-3 transition-colors duration-200 text-sm font-normal"
            >
              {buttonText}
            </button>
          </div>

          {/* Right Image */}
          <div className="relative h-64 lg:h-80 overflow-hidden">
            <img
              src={imageUrl}
              alt="Interior Design"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};


export default CustomProduct;