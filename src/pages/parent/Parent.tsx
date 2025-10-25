import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

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
