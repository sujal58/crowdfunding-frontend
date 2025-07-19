import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <header className="header" aria-label="Main navigation">
      <div className="header-logo" onClick={() => navigate("/")}>
        {/* fundSaathi */}
        <img
          src="/longlogo.png"
          alt="Logo of fundSaathi"
          height={200}
          width={200}
        />
      </div>
      <div className="auth-btn">
        <button className="btn-login" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="btn-register" onClick={() => navigate("/register")}>
          Register
        </button>
      </div>
    </header>
  );
}

export default Header;
