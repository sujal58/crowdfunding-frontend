import "./Hero.css";

function Hero() {
  return (
    <section className="hero" aria-label="Hero section">
      <div className="hero-content">
        <h1>Fund Dreams, Change Lives</h1>
        <p>
          Join our platform to support cause you believe in, or start your own
          campaign to make a difference.
        </p>
        <p className="mission">
          Ar RiseEasy, we empower communities to turn ideas into reality with
          secure, transparent crowdfunding..
        </p>
        <div className="btn-group" aria-label="Primary call to action buttons">
          <button className="btn-primary" aria-label="Start a new Campaign">
            Start Campaign
          </button>
          <button className="btn-secondary" aria-label="Start a new Campaign">
            Explore Causes
          </button>
        </div>
      </div>
    </section>
  );
}
export default Hero;
