import { Navigate, Outlet } from "react-router-dom";

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
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
