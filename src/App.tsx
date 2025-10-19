import "./App.css";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import WallpaperGrid from "./mainSection/e_commerce/OurProducts";
// import ProductDetail from "./mainSection/e_commerce/Product";
import CheckoutPage from "./mainSection/e_commerce/CheckoutPage";
// import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <>
      {/* <CartProvider> */}
        <NavBar />
        <Routes>
          <Route path="/ourProduct" element={<WallpaperGrid />} />
          {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
        <Footer />
      {/* </CartProvider> */}
    </>
  );
}

export default App;
