import { Navigate, useNavigate } from "react-router-dom";
import "./Hero.css";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section
      className="hero"
      aria-label="Hero section with headline and call to actions"
    >
      <div className="hero-content">
        <h1 tabIndex={0}>Fund Dreams, Change Lives</h1>
        <p>
          Join our platform to support causes you believe in, or start your own
          campaign to make a difference.
        </p>
        <p className="mission">
          At RiseEasy, we empower communities to turn ideas into reality with
          secure, transparent crowdfunding.
        </p>
        <div
          className="btn-group"
          role="group"
          aria-label="Primary call to action buttons"
        >
          <button
            className="btn-primary"
            aria-label="Start a new campaign"
            onClick={() => navigate("/login")}
          >
            Start Campaign
          </button>
          <button className="btn-secondary" aria-label="Explore causes">
            Explore Causes
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
