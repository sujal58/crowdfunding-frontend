import "./WhyRiseEasy.css";

function WhyRiseEasy() {
  const stats = [
    { number: "10K+", label: "Campaigns Funded" },
    { number: "$5M+", label: "Raised for Causes" },
    { number: "50K+", label: "Active Supporters" },
  ];
  return (
    <section className="why-riseeasy">
      <h2>Why Choose RiseEasy?</h2>
      <p>
        Our platform empowers creators with a secure, transparent, and
        easy-to-use crowdfunding experience, connecting you to supporters
        worldwide.
      </p>
      <div className="stats-grid">
        {stats.map((value) => (
          <div key={value.label} className="stat-card">
            <div className="stat-number">{value.number}</div>
            <div className="stat-label">{value.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyRiseEasy;
