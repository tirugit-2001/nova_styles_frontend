import React from 'react';

interface Testimonial {
  id: number;
  image: string;
  quote: string;
  author?: string;
}

interface AboutHeroProps {
  testimonials?: Testimonial[];
}

const AboutHero: React.FC<AboutHeroProps> = ({ testimonials }) => {
  const defaultTestimonials: Testimonial[] = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80',
      quote: '“Nova Styles transformed our small 2 BHK into a beautiful, functional home”',
      author: '- Rajesh & Priya Nair'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80',
      quote: '“Our small 2 BHK into a beautiful, functional home”'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800&q=80',
      quote: '“Our small 2 BHK into a beautiful, functional home”'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
      quote: '“Our small 2 BHK into a beautiful, functional home”'
    }
  ];

  const items = testimonials || defaultTestimonials;

  return (
    <section className="w-full py-12 px-4 bg-[#F4F4F4]">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="relative overflow-hidden shadow-md bg-white"
        >
          {/* Image */}
          <img
            src={item.image}
            alt={`Testimonial ${item.id}`}
            className="w-full h-full object-cover"
          />

          {/* Quote overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-black bg-[#DFE6DE]">
            <p className="text-gray-900 text-sm leading-relaxed">{item.quote}</p>
            {item.author && (
              <p className="text-gray-700 text-xs mt-1 font-medium">{item.author}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
  );
};

export default AboutHero;
