import "./Header.css";

function Header() {
  return (
    <header className="header" aria-label="Main navigation">
      <div className="header-logo">RiseEasy</div>
      <div className="auth-btn">
        <button className="btn-login">Login</button>
        <button className="btn-register">Register</button>
      </div>
    </header>
  );
}

export default Header;
