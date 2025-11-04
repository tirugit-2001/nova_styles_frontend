import { Outlet } from "react-router-dom";

import Footer from "../../components/layouts/Footer";
import NavBar from "../../components/layouts/NavBar";

const Parent = () => {
  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Parent;
