import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const InteriorClientTalk = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Rajesh & Priya Nair",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      quote: "Nova Styles transformed our small 2 BHK into a beautiful, functional home",
      rating: 5
    },
    {
      id: 2,
      name: "Rajesh & Priya Nair",
      image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop",
      quote: "Nova Styles transformed our small 2 BHK into a beautiful, functional home",
      rating: 5
    },
    {
      id: 3,
      name: "Rajesh & Priya Nair",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
      quote: "Nova Styles transformed our small 2 BHK into a beautiful, functional home",
      rating: 5
    },
    {
      id: 4,
      name: "Amit & Sneha Sharma",
      image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=600&fit=crop",
      quote: "Exceptional service and stunning results. Our dream home is now a reality",
      rating: 5
    },
    {
      id: 5,
      name: "Vikram & Anita Patel",
      image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&h=600&fit=crop",
      quote: "Professional team, timely delivery, and beautiful interiors. Highly recommended",
      rating: 5
    }
  ];

  const itemsPerView = 3;
  const maxIndex = testimonials.length - itemsPerView;

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, maxIndex]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section className="py-16 md:py-24 bg-[#F4F4F4]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
            What Our Clients Say About Us
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            Latest dream home interiors delivered the hassle-free way
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative">
          {/* Desktop View - 3 Cards */}
          <div className="hidden md:block overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="min-w-[33.333%] px-3"
                >
                  <div className="bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                    {/* Image with Quote Overlay */}
                    <div className="relative h-80">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0" />
                      
                      {/* Content on Image */}
                      <div className="absolute bottom-0 left-0 right-20 top-48 p-2 text-black bg-[#DFE6DE]">
                        <div className="mb-2 ">
                          <p className="text-base md:text-base font-light">
                            "{testimonial.quote}"
                          </p>
                        </div>
                        <p className="font-bold text-sm">
                          -{testimonial.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile View - 1 Card */}
          <div className="md:hidden">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-96">
                <img
                  src={testimonials[currentIndex % testimonials.length].image}
                  alt={testimonials[currentIndex % testimonials.length].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-20 top-60 p-3 text-black bg-[#DFE6DE]">
                  <div className="mb-2">
                    {/* <Quote className="text-base font-light" /> */}
                    <p className="text-base md:text-lg font-medium leading-relaxed">
                      "{testimonials[currentIndex % testimonials.length].quote}"
                    </p>
                  </div>
                  <p className="font-bold text-sm">
                    -{testimonials[currentIndex % testimonials.length].name}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white hover:bg-gray-100 rounded-full shadow-lg transition-all duration-300 z-10 group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-800 group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white hover:bg-gray-100 rounded-full shadow-lg transition-all duration-300 z-10 group"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-800 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: testimonials.length - (itemsPerView - 1) }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
              }}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-8 h-2 bg-brand'
                  : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteriorClientTalk;