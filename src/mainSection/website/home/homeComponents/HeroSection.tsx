import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// import {HeroData} from '../../data.js'
import type { HeroSectionModel } from '../../../Admin/AdminComponents/HeroSectionAdmin.js';




const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<HeroSectionModel[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('heroData');
    if(stored){
      setSlides(JSON.parse(stored))
    }
  },[])


// AUTO REFRESH WHEN THE ADMIN PANEL GETS ADDED THE INFORMATION
  useEffect(() => {
  const handleStorageChange = () => {
    const updated = localStorage.getItem("heroData");
    if (updated) setSlides(JSON.parse(updated));
  };
  window.addEventListener("storage", handleStorageChange);
  return () => window.removeEventListener("storage", handleStorageChange);
}, []);

  // const slides = [
  //   {
  //     title: "Complete Home Interior Design",
  //     subtitle: "Transform your 2BHK, 3BHK or Villa with end-to-end interior solution",
  //     price: "Starting ₹4,50,000",
  //     image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&h=800&fit=crop"
  //   },
  //   {
  //     title: "Luxury Living Spaces",
  //     subtitle: "Create stunning interiors that reflect your unique style and personality",
  //     price: "Starting ₹4,50,000",
  //     image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop"
  //   },
  //   {
  //     title: "Modern Kitchen Designs",
  //     subtitle: "Functional and beautiful kitchen solutions for your dream home",
  //     price: "Starting ₹4,50,000",
  //     image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=1200&h=800&fit=crop"
  //   }
  // ];

  const stats = [
    { number: "500+", label: "Homes Completed" },
    { number: "05 Year", label: "Warranty" },
    { number: "05 Year", label: "Warranty" },
    { number: "45- Days", label: "Completion" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full mt-[140px] lg:mt-[180px]">
      {/* Hero Slider */}
      <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-gray-900">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full max-w-7xl mx-auto px-4 md:px-8 flex items-center">
              <div className="max-w-2xl text-white">
                <p className="text-sm md:text-2xl lg-text-2xl text-[#DFE6DE] font-medium tracking-wide">
                  {slide.title.split(' ')[0]} {slide.title.split(' ')[1]} {slide.title.split(' ')[2]} {slide.title.split(' ')[3]}
                </p>
                <h1 className="text-2xl md:text-4xl lg:text-6xl font-satoshi text font-medium mb-6 leading-tight">
                  {slide.subtitle}
                </h1>
                <p className="text-base md:text-base mb-2 text-white font-semibold">
                  {slide.price}
                </p>
                <a href="/contactUs">
                <button className="px-8 py-4 bg-brand text-white  hover:bg-amber-500 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105">
                  Get Free Estimate
                </button>
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all duration-300 group"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all duration-300 group"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:scale-110 transition-transform" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 ">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? 'w-12 h-3 bg-brand'
                  : 'w-3 h-3 bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-8 md:py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-xl md:text-xl lg:text-2xl font-bold text-[#7C947A] mb-2">
                  {stat.number}
                </div>
                <div className="text-base md:text-lg text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;