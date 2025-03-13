import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = () => {
  const token = Cookies.get("token"); // Retrieve token from cookies

  return token ? <Outlet /> : <Navigate to="/login" replace />; // check if user has token, if no redirect to login
};

export default ProtectedRoute;
