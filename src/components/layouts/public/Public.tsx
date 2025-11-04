import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";
const Public = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default Public;
