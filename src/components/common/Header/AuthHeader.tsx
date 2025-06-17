import { useNavigate } from "react-router-dom";
import "./Header.css";

function AuthHeader() {
  let navigate = useNavigate();
  const handleLogout = () => {
    console.log("Logging out");
    window.location.hash = "login";
  };

  return (
    <header className="header">
      <h1 className="header-logo" onClick={() => navigate("/dashboard")}>
        RiseEasy
      </h1>
      <label>Welcome, Admin</label>
      <nav className="auth-btn">
        <button
          className="btn-login"
          onClick={() => navigate("/create-campaign")}
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
