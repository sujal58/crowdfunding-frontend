import { delay } from "framer-motion";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

type RequireAuthProp = {
  allowedRole: string[];
};

type userData = {
  username: string;
  token: string;
  roles: string[];
};

const RequireAuth: React.FC<RequireAuthProp> = ({
  allowedRole,
}: RequireAuthProp) => {
  const user: userData = JSON.parse(localStorage.getItem("userdata")!);
  const role = user?.roles;

  if (!user) return <Navigate to="/login" replace />;

  if (!allowedRole.includes(role.toString())) {
    toast.warn("You are not allowed!");

    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
