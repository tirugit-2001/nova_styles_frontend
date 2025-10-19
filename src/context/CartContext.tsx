// import React, { createContext, useContext, useState, useEffect, type ReactNode, } from 'react';
// // import type { ProductAdminModel } from '../mainSection/Admin/AdminComponents/ProductAdmin';

// // interface CartItem extends  {
// //   // quantity: number;
// // }

// interface CartContextType {
//   id:string,
//   // cartItems: CartItem[];
//   addToCart: ( ) => void;
//   removeFromCart: (id: string | null) => void;
//   updateQuantity: (id: string | null, quantity: number) => void;
//   clearCart: () => void;
//   getCartTotal: () => number;
//   getCartCount: () => number;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   // const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   // Load cart from localStorage on mount
//   useEffect(() => {
//     const savedCart = localStorage.getItem('cartItems');
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, []);

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('cartItems', JSON.stringify(cartItems));
//   }, [cartItems]);

//   // const addToCart = (product: ProductAdminModel) => {
//   //   setCartItems((prevItems) => {
//   //     const existingItem = prevItems.find((item) => item.id === product.id);
      
//   //     if (existingItem) {
//   //       // If item already exists, increment quantity
//   //       return prevItems.map((item) =>
//   //         item.id === product.id
//   //           ? { ...item, quantity: item.quantity + 1 }
//   //           : item
//   //       );
//   //     } else {
//   //       // Add new item with quantity 1
//   //       return [...prevItems, { ...product, quantity: 1 }];
//   //     }
//   //   });
//   // };

//   const removeFromCart = (id: string | null) => {
//     setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
//   };

//   const updateQuantity = (id: string | null, quantity: number) => {
//     if (quantity <= 0) {
//       removeFromCart(id);
//       return;
//     }
    
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, quantity } : item
//       )
//     );
//   };

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   const getCartTotal = () => {
//     return cartItems.reduce((total, item) => {
//       const price = parseFloat(item.discountedPrice) || 0;
//       return total + price * item.quantity;
//     }, 0);
//   };

//   const getCartCount = () => {
//     return cartItems.reduce((count, item) => count + item.quantity, 0);
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//         getCartTotal,
//         getCartCount,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (context === undefined) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };