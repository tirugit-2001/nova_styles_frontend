const storedHero = localStorage.getItem("heroData");

export const HeroData = storedHero
  ? [JSON.parse(storedHero)]
  : [
      {
        id: 1,
        title: "Complete Home Interior Design",
        subtitle:
          "Transform your 2BHK, 3BHK or Villa with end-to-end interior solution",
        price: "Starting ₹4,50,000 ",
        image:
          "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&h=800&fit=crop",
      },
      {
      title: "Luxury Living Spaces",
      subtitle: "Create stunning interiors that reflect your unique style and personality",
      price: "Starting ₹4,50,000",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop"
    },
    {
      title: "Modern Kitchen Designs",
      subtitle: "Functional and beautiful kitchen solutions for your dream home",
      price: "Starting ₹4,50,000",
      image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=1200&h=800&fit=crop"
    }
    ];




    // interface Product {
//   id: number;
//   name: string;
//   image: string;
//   originalPrice: number;
//   discountedPrice: number;
//   pricePerSqFt: number;
//   description: string;
// }

// interface ProductDetailProps {
//   product: Product;
//   onBack: () => void;
// }

// const defaultProducts: Product[] = [
//   {
//     id: 1,
//     name: "The Wind in the Willows",
//     image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
//     originalPrice: 350,
//     discountedPrice: 263,
//     pricePerSqFt: 263,
//     description: "Beautiful wallpaper with timeless style."
//   },
//   {
//     id: 2,
//     name: "The Wind in the Willows",
//     image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=400&h=400&fit=crop",
//     originalPrice: 350,
//     discountedPrice: 263,
//     pricePerSqFt: 263,
//     description: "Elegant design for modern interiors."
//   },
//   {
//       id: 3,
//       name: "The Wind in the Willows",
//       image: "https://images.unsplash.com/photo-1560015534-cee980ba7e13?w=400&h=400&fit=crop",
//       originalPrice: 350,
//       discountedPrice: 263,
//       pricePerSqFt: 263,
//       description: "Elegant design for modern interiors."
//     },
//     {
//       id: 4,
//       name: "The Wind in the Willows",
//       image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&h=400&fit=crop",
//       originalPrice: 350,
//       discountedPrice: 263,
//       pricePerSqFt: 263,
//       description: "Elegant design for modern interiors."
//     },
//     {
//       id: 5,
//       name: "The Wind in the Willows",
//       image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
//       originalPrice: 350,
//       discountedPrice: 263,
//       pricePerSqFt: 263,
//       description: "Elegant design for modern interiors."
//     },
//     {
//       id: 6,
//       name: "The Wind in the Willows",
//       image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=400&h=400&fit=crop",
//       originalPrice: 350,
//       discountedPrice: 263,
//       pricePerSqFt: 263,
//       description: "Elegant design for modern interiors."
//     },
//     {
//       id: 7,
//       name: "The Wind in the Willows",
//       image: "https://images.unsplash.com/photo-1560015534-cee980ba7e13?w=400&h=400&fit=crop",
//       originalPrice: 350,
//       discountedPrice: 263,
//       pricePerSqFt: 263,
//       description: "Elegant design for modern interiors."
//     },
//     {
//       id: 8,
//       name: "The Wind in the Willows",
//       image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&h=400&fit=crop",
//       originalPrice: 350,
//       discountedPrice: 263,
//       pricePerSqFt: 263,
//       description: "Elegant design for modern interiors."
//     }
  
// ];
