import useAuth from "@/Context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
function AuthLayout() {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  return <>{<Outlet />}</>;
}

export default AuthLayout;
