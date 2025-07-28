import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import useAuth from "@/Context/AuthContext";
import { MdVerifiedUser } from "react-icons/md";
import { useEffect, useState } from "react";

function AuthHeader() {
  let navigate = useNavigate();
  let location = useLocation();
  const { logout, username, status } = useAuth();
  const [isVerified, setIsVerified] = useState(
    status === "VERIFIED" ? true : false
  );

  useEffect(() => {
    setIsVerified(status === "VERIFIED" ? true : false);
  }, [status]);

  const navigateLink = location.pathname.includes("/user-dashboard")
    ? "/user-dashboard"
    : "/admin-dashboard";

  return (
    <>
      <header className="header">
        <h1 className="header-logo" onClick={() => navigate(navigateLink)}>
          <img src="/longlogo.png" alt="Logo of fundSaathi" />
        </h1>

        <nav className="auth-btn">
          <div className="user-name-status flex items-center gap-2 text-sm text-muted-foreground">
            <span>Welcome, {username}</span>
            {status === "VERIFIED" && (
              <MdVerifiedUser className="h-4 w-4 text-primary" />
            )}
          </div>
          <button className="btn-register" onClick={() => logout()}>
            Log Out
          </button>
        </nav>
      </header>
    </>
  );
}

export default AuthHeader;
