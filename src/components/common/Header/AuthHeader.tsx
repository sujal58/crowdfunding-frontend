import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

function AuthHeader({ username }: { username: string }) {
  let navigate = useNavigate();
  let location = useLocation();
  const handleLogout = () => {
    console.log("Logging out");
    window.location.hash = "login";
  };

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
        <button className="btn-register" onClick={handleLogout}>
          Log Out
        </button>
      </nav>
    </header>
  );
}

export default AuthHeader;
