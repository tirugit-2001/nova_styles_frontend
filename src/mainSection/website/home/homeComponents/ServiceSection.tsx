
const ServiceSection = () => {
  const services = [
    {
      id: 1,
      title: "Interior Solutions",
      price: "Starting ₹4,50,000",
      image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&h=600&fit=crop",
      description: "Transform your entire home with our comprehensive interior design solutions"
    },
    {
      id: 2,
      title: "Interior Solutions",
      price: "Starting ₹4,50,000",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      description: "Modern and elegant living spaces designed for your lifestyle"
    },
    {
      id: 3,
      title: "Interior Solutions",
      price: "Starting ₹4,50,000",
      image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop",
      description: "Contemporary designs that blend functionality with aesthetics"
    },
    {
      id: 4,
      title: "Interior Solutions",
      price: "Starting ₹4,50,000",
      image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=600&fit=crop",
      description: "Personalized interior solutions for your dream home"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F4F4F4]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-3xl lg:text-4xl font-medium text-gray-800 mb-4">
            Our Comprehensive Design & Construction Services
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
            Latest dream home interiors delivered the hassle-free way
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative h-64 md:h-72 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                  style={{
                    backgroundImage: `url(${service.image})`
                  }}
                >
                  {/* Gradient Overlay */}
                  <div className="" />
                </div>
              </div>

              {/* CTA Button */}
              <div className="p-6">
                 <div className="flex-row justify-between">
                  <h3 className="text-lg md:text-xl font-medium leading-tight mb-2">
                    {service.title}
                  </h3>
                  <p className="text-base font-normal mb-2">{service.description}</p>
                  <p className="text-base md:text-lg font-semibold text-brand">
                    {service.price}
                  </p>
                </div>
                {/* <button className="w-full py-3 bg-brand text-white rounded-lg hover:bg-amber-500 transition-all duration-300 font-semibold text-base shadow-md hover:shadow-lg">
                  Get Free Estimate
                </button> */}
              </div>
              </div>
          ))}
        </div>

        {/* Bottom CTA */}
        {/* <div className="text-center mt-12 md:mt-16">
          <button className="px-8 py-4 bg-amber-400 text-gray-900 rounded-lg hover:bg-amber-500 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105">
            View All Services
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default ServiceSection;