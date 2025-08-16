import "./CampaignDescription.css";

function CampaignDescription() {
  return (
    <article className="campaign-details">
      <h2>Campaign Description</h2>
      <p>
        This campaign aims to provide clean, safe drinking water to communities
        in need. Funds will be used to build wells and install purification
        systems.
      </p>
      <h3>Use of Funds</h3>
      <ul>
        <li>Drilling wells: 50%</li>
        <li>Water purification installation: 30%</li>
        <li>Maintenance & community training: 20%</li>
      </ul>
      <h3>Creator</h3>
      <p>
        Created by John Smith, an experienced humanitarian with 10 years of
        water access projects worldwide.
      </p>
      <h3>Timeline</h3>
      <p>
        Expected to complete within 12 months after funding goal is reached.
      </p>
      <h3>Certifications & Audits</h3>
      <p>
        This campaign is regularly audited by Global Water Trust and provides
        monthly updates to all donors.
      </p>
    </article>
  );
}

export default CampaignDescription;
