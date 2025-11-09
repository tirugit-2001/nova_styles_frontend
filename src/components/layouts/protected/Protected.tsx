import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";
const Protected = () => {
  const { isAuthenticated, loading } = useAuthStore();
  console.log("isauthfdjflkajsfkljaklfjaklfjaskl");
  console.log(isAuthenticated, loading);
  if (loading) {
    return <h1 className="text-lg">Loading...</h1>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default Protected;
