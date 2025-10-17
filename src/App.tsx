import "./App.css";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import AboutUs from "./mainSection/website/aboutUs/AboutUs";
import HomePage from "./mainSection/website/home/HomePage";
import { Routes, Route } from "react-router-dom";
import PortfolioSection from "./mainSection/website/portfolio/portfolio";
import InteriorDesignForm from "./mainSection/website/contactUs/ContactForm";
import Construction from "./mainSection/website/constructions/construction";
import InteriorandDesign from "./mainSection/website/interior-design/InteriorandDesign";
import WallpaperGrid from "./mainSection/e_commerce/OurProducts";
import ProductDetail from "./mainSection/e_commerce/Product";
import CheckoutPage from "./mainSection/e_commerce/CheckoutPage";
import { CartProvider } from "./context/CartContext";
import AdminDashboard from "./mainSection/Admin/AdminDashboard";
import { HeroSectionAdmin } from "./mainSection/Admin/AdminComponents/HeroSectionAdmin";
import { InteriorScrollAdmin } from "./mainSection/Admin/AdminComponents/InteriorScrollAdmin";
import { PortfolioAdmin } from "./mainSection/Admin/AdminComponents/PortfolioAdmin";
import { ProductAdmin } from "./mainSection/Admin/AdminComponents/ProductAdmin";

function App() {
  return (
    <>
      <CartProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/portfolio" element={<PortfolioSection />} />
          <Route path="/contactUs" element={<InteriorDesignForm />} />
          <Route path="/construction" element={<Construction />} />
          <Route path="/interiorHome" element={<InteriorandDesign />} />
          <Route path="/ourProduct" element={<WallpaperGrid />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/hero" element={<HeroSectionAdmin />} />
          <Route path= '/admin/interiorscroll' element={<InteriorScrollAdmin />} />
          <Route path= '/admin/portfolioadmin' element={<PortfolioAdmin />} />
          <Route path="/admin/products" element={<ProductAdmin />} />
          {/* <Route path="/admin/reviews" element={<ReviewsAdmin />} /> */}
          {/* <Route path="/admin/footer" element={<FooterAdmin />} /> */} 
        </Routes>
        <Footer />
      </CartProvider>
    </>
  );
}

export default App;
