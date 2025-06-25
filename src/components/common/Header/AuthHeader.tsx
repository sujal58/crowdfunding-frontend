import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import useAuth from "@/Context/AuthContext";

function AuthHeader() {
  let navigate = useNavigate();
  let location = useLocation();
  const { logout, username } = useAuth();

  const navigateLink = location.pathname.includes("/user-dashboard")
    ? "/user-dashboard"
    : "/admin-dashboard";

  return (
    <header className="header">
      <h1 className="header-logo" onClick={() => navigate(navigateLink)}>
        RiseEasy
      </h1>
      <label>Welcome, {username}</label>
      <nav className="auth-btn">
        <button
          className="btn-login"
          onClick={() => navigate(`${navigateLink}/create-campaign`)}
        >
          Create Campaign
        </button>
        <button className="btn-register" onClick={() => logout()}>
          Log Out
        </button>
      </nav>
    </header>
  );
}

export default AuthHeader;
