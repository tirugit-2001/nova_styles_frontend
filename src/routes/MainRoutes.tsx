import { Routes, Route } from "react-router-dom";
import Parent from "../pages/parent/Parent";
import Home from "../pages/home/Home";
import ProductDetail from "../pages/productdetail/ProductDetail";
import Cart from "../pages/cart/Cart";
import Orders from "../pages/orders/Orders";
import CheckoutPage from "../pages/checkout/CheckoutPage";
import Protected from "../pages/protected/Protected";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Profile from "../pages/profile/Profile";
import MyOrders from "../pages/profile/myorders/MyOrders";
import Myaddress from "../pages/profile/myaddress/Myaddress";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Parent />}>
        <Route index element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route element={<Protected />}>
          <Route path="/orders" element={<Orders />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/profile" element={<Profile />}>
            <Route index element={<MyOrders />} />
            <Route path="myaddress" element={<Myaddress />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default MainRoutes;
// id=rzp_test_RWCYoeAwCusnnW;
// secre =5pQzpFpVW2rhf63dyMNXq0Kd
