import "./StartCampaign.css";
function StartCampaign() {
  const steps = [
    {
      number: 1,
      title: "Log In or Sign Up",
      description:
        'Create an account or log in to start your fundraising journey with <span class="highlight">RiseEasy</span>.',
      ariaLabel: "Step 1: Log In or Sign Up",
    },
    {
      number: 2,
      title: "Verify Your KYC",
      description:
        'Our advanced <span class="highlight">machine learning</span> checks your KYC super quickly, ensuring a secure and trusted platform.',
      ariaLabel: "Step 2: Verify Your KYC",
    },
    {
      number: 3,
      title: "Launch Your Campaign",
      description:
        'You’re good to go! Launch your campaign in minutes and turn your dreams into reality with our <span class="highlight">secure, transparent system</span>.',
      ariaLabel: "Step 3: Launch Your Campaign",
    },
  ];

  return (
    <section
      className="start-campaign"
      aria-label="How to Start Your First Campaign"
    >
      <h2>How to Start Your First Campaign</h2>
      <p>
        Launch your fundraising journey in just a few simple steps with
        RiseEasy’s seamless process.
      </p>
      <div className="steps-grid" aria-label="Steps to start a campaign">
        {steps.map((step) => (
          <div
            key={step.number}
            className="step-card"
            tabIndex={0}
            aria-label={step.ariaLabel}
          >
            <div className="step-number">{step.number}</div>
            <div className="step-content">
              <h3>{step.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: step.description }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StartCampaign;
