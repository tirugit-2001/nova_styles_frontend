import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
  const user: boolean = false;
  if (!user) {
    <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default Protected;
