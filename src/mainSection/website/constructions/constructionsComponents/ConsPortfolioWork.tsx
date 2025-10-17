import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const ConsPortfolioWork = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Office'];

  const portfolioItems = [
    {
      id: 1,
      title: "Modern 4 BHK",
      location: "Penthouse, Bangalore",
      category: "Living Room",
      image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&h=600&fit=crop"
    },
    {
      id: 2,
      title: "Modern 4 BHK",
      location: "Penthouse, Bangalore",
      category: "Living Room",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
    },
    {
      id: 3,
      title: "Modern 4 BHK",
      location: "Penthouse, Bangalore",
      category: "Living Room",
      image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop"
    },
    {
      id: 4,
      title: "Modern 4 BHK",
      location: "Penthouse, Bangalore",
      category: "Bedroom",
      image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=600&fit=crop"
    },
    {
      id: 5,
      title: "Luxury Villa",
      location: "Apartment, Mumbai",
      category: "Kitchen",
      image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=800&h=600&fit=crop"
    },
    {
      id: 6,
      title: "Contemporary Home",
      location: "Villa, Delhi",
      category: "Bedroom",
      image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop"
    },
    {
      id: 7,
      title: "Minimalist Design",
      location: "Studio, Pune",
      category: "Office",
      image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop"
    },
    {
      id: 8,
      title: "Elegant Interior",
      location: "Apartment, Chennai",
      category: "Bathroom",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop"
    }
  ];

  const filteredItems = selectedCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <section className="py-16 md:py-24 bg-[#F4F4F4]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 md:mb-16">
          <div>
            <h2 className="text-2xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
              Our Comprehensive Design & Construction Services
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              Latest dream home interiors delivered the hassle-free way
            </p>
          </div>
          <button className="mt-6 md:mt-0 px-6 py-3 bg-brand text-white hover:bg-brand-dark transition-all duration-300 font-semibold shadow-lg hover:shadow-xl whitespace-nowrap">
            Get Free Estimate
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-10 md:mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-brand text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative bg-white overflow-hidden brand-lg hover:brand-2xl transition-all duration-500 transform hover:-translate-y-2"
              style={{
                animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* Image Container */}
                <a href="/portfolio">
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />

                {/* Gradient Overlay (bottom to top with #d6ad75 on hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:bg-gradient-to-t group-hover:from-[#d6ad75]/90 group-hover:via-[#d6ad75]/50 group-hover:to-transparent transition-all duration-500" />

                {/* Text Overlay - Slide up effect */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white ">
                  <h3 className="text-xl md:text-2xl font-bold mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-200">
                    {item.location}
                  </p>
                </div>

                {/* Hover Button - Bottom Right */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  {/* <button className="px-5 py-2 bg-amber-400 text-gray-900 rounded-lg font-semibold shadow-lg hover:bg-amber-500 flex items-center gap-2">
                    View Project
                    <ChevronRight size={18} />
                  </button> */}
                </div>
              </div>
                </a>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12 md:mt-16">
          <a href="portfolio">
            <button className="px-8 py-4 bg-brand text-white hover:bg-brand-dark transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 inline-flex items-center gap-2">
              Load More Projects
              <ChevronRight size={24} />
            </button>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default ConsPortfolioWork;