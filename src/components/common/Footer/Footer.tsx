import "./Footer.css";
import { useState } from "react";

function Footer() {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <footer
      className="footer"
      aria-label="Footer with navigation, newsletter, and social links"
    >
      <div className="footer-content">
        <div className="footer-column about">
          <h3>RiseEasy</h3>
          <p>
            Empowering dreams through secure, transparent crowdfunding. Join us
            to fund causes that matter.
          </p>
          <div className="social-links">
            <a href="#facebook" aria-label="Follow us on Facebook">
              <svg className="social-icon" fill="#2563eb" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
              </svg>
            </a>
            <a href="#twitter" aria-label="Follow us on Twitter">
              <svg className="social-icon" fill="#2563eb" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#instagram" aria-label="Follow us on Instagram">
              <svg className="social-icon" fill="#2563eb" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.307.975.975 1.245 2.242 1.307 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.307 3.608-.975.975-2.242 1.245-3.608 1.307-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.307-.975-.975-1.245-2.242-1.307-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.332-2.633 1.307-3.608.975-.975 2.242-1.245 3.608-1.307 1.266-.058 1.646-.07 4.85-.07M12 0C8.741 0 8.332.014 7.052.072 5.771.13 4.402.404 3.263 1.543 2.123 2.682 1.848 4.052 1.79 5.333 1.732 6.613 1.718 7.022 1.718 12s.014 5.387.072 6.667c.058 1.281.332 2.651 1.471 3.79 1.139 1.139 2.509 1.413 3.79 1.471 1.28.058 1.689.072 6.667.072s5.387-.014 6.667-.072c1.281-.058 2.651-.332 3.79-1.471 1.139-1.139 1.413-2.509 1.471-3.79.058-1.28.072-1.689.072-6.667s-.014-5.387-.072-6.667c-.058-1.281-.332-2.651-1.471-3.79-1.139-1.139-2.509-1.413-3.79-1.471C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="footer-column links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="#terms">Terms of Service</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
        <div className="footer-column newsletter">
          <h3>Stay Connected</h3>
          <p>Subscribe to our newsletter for updates and inspiring stories.</p>
          <form
            className="newsletter-form"
            aria-label="Newsletter signup"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Enter your email for newsletter"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" aria-label="Subscribe to newsletter">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Crowdfund Trust Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
