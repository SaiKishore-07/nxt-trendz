// ProtectedRoute.js
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookie from "js-cookie";

const ProtectedRoute = () => {
  const location = useLocation();
  const token = Cookie.get("jwt_token");

  // If not logged in, redirect to login page and keep track of the location
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // If token exists, allow access to protected route
  return <Outlet />;
};

export default ProtectedRoute;
