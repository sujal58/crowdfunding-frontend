import useAuth from "@/Context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import isTokenExpired from "@/utils/tokenValidator";
function AuthLayout() {
  const { token } = useAuth();
  const isExpired = isTokenExpired(token);

  if (!token || isExpired) {
    localStorage.removeItem("userdata");
    return <Navigate to={"/login"} />;
  }

  return <>{<Outlet />}</>;
}

export default AuthLayout;
