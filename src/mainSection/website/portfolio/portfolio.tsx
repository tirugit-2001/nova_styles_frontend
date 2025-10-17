import { ArrowRight } from 'lucide-react';
import GalleryModal from './gallaryModal';
import { useState } from 'react';

export default function PortfolioSection() {
      const [selectedGallery, setSelectedGallery] = useState<string[] | null>(null);
  const portfolioItems = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=500&h=400&fit=crop',
      title: 'Modern 4 BHK',
      location: 'Penthouse, Bangalore, pinya',
        gallery: [
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=500&h=400&fit=crop"
      ]
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&h=400&fit=crop',
      title: 'Modern 4 BHK',
      location: 'Penthouse, Bangalore',
      gallery: [
        "https://images.unsplash.com/photos/gray-steel-3-door-refrigerator-near-modular-kitchen-MP0bgaS_d1c",
        "https://unsplash.com/photos/white-over-the-range-oven-GliaHAJ3_5A",
        "https://unsplash.com/photos/a-kitchen-with-two-stools-next-to-a-counter-XQ4cYH7Jhjo"
      ]
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=500&h=400&fit=crop',
      title: 'Modern 4 BHK',
      location: 'Farmhouse, Bangalore',
      gallery: [
        "https://images.unsplash.com/photo-1600210493000-111?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1600210493001-222?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1600210493002-333?w=600&h=400&fit=crop"
      ]
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=500&h=400&fit=crop',
      title: 'Modern 3 BHK',
      location: 'Penthouse, Bangalore',
      gallery: [
        "https://images.unsplash.com/photo-1600210493000-111?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1600210493001-222?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1600210493002-333?w=600&h=400&fit=crop"
      ]
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=500&h=400&fit=crop',
      title: 'Modern 4 BHK',
      location: 'Penthouse, Bangalore',
      gallery: [
        "https://images.unsplash.com/photo-1600210493000-111?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1600210493001-222?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1600210493002-333?w=600&h=400&fit=crop"
      ]
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&h=400&fit=crop',
      title: 'Modern 4 BHK',
      location: 'Penthouse, Bangalore',
      gallery: [
        "https://images.unsplash.com/photo-1600210493000-111?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1600210493001-222?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1600210493002-333?w=600&h=400&fit=crop"
      ]
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=500&h=400&fit=crop',
      title: 'Modern 4 BHK',
      location: 'Farmhouse, Bangalore',
      gallery: [
        "https://images.unsplash.com/photo-1600210493000-111?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1600210493001-222?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1600210493002-333?w=600&h=400&fit=crop"
      ]
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=500&h=400&fit=crop',
      title: 'Modern 3 BHK',
      location: 'Penthouse, Bangalore',
      gallery: [
        "https://images.unsplash.com/photo-1600210493000-111?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1600210493001-222?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1600210493002-333?w=600&h=400&fit=crop"
      ]
    }
  ];

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 mt-40">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Our Comprehensive Design & Construction Services
          </h2>
          <p className="text-gray-600 text-lg">
            Latest dream home interiors delivered the hassle-free way
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-6">
  {portfolioItems.map((item) => (
    <div
      key={item.id}
      className="group relative bg-white overflow-hidden  hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
      onClick={() => setSelectedGallery(item.gallery)}
    >
      {/* Image Container */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-[#d6ad75]/90 group-hover:via-[#d6ad75]/50 group-hover:to-transparent transition-all duration-500" />

        {/* Text Overlay - Simple, always visible */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <h3 className="text-xl md:text-2xl font-bold mb-1">
            {item.title}
          </h3>
          <p className="text-sm md:text-base text-gray-200">
            {item.location}
          </p>
        </div>
      </div>
    </div>
  ))}
</div>

        {/* More Interior Projects Button */}
        <div className="flex justify-start">
          <button className="flex items-center gap-2 text-gray-800 font-semibold hover:text-yellow-600 transition-colors duration-300 group">
            <span className="text-lg">More Interior Projects</span>
            <ArrowRight 
              size={20} 
              className="transform group-hover:translate-x-1 transition-transform duration-300"
            />
          </button>
        </div>
      </div>

        {/* Modal */}
      {selectedGallery && (
        <GalleryModal images={selectedGallery} onClose={() => setSelectedGallery(null)} />
      )}
    </div>
  );
}