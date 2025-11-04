import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";
const Protected = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default Protected;
