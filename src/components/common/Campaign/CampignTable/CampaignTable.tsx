import { toast } from "react-toastify";
import "./CampaignTable.css";

function CampaignTable() {
  const campaigns = [
    {
      title: "Clean Water for All",
      goal: "$10,000",
      raised: "$7,800",
      status: "Active",
    },
    {
      title: "Education for Every Child",
      goal: "$15,000",
      raised: "$5,400",
      status: "Pending Approval",
    },
  ];

  const handleAction = (action: string, campaign: string) => {
    console.log(`${action} campaign: ${campaign}`);
    toast.info(`${action} ${campaign}`, {
      style: { background: "#eff6ff", color: "#2563eb" },
    });
  };

  return (
    <section aria-labelledby="campaignsHeading">
      <h2 id="campaignsHeading" className="text-center font-bold text-blue-600">
        My Campaigns
      </h2>
      <table aria-label="User campaigns">
        <thead>
          <tr>
            <th>Title</th>
            <th>Goal</th>
            <th>Raised</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign.title}>
              <td>{campaign.title}</td>
              <td>{campaign.goal}</td>
              <td>{campaign.raised}</td>
              <td>{campaign.status}</td>
              <td>
                <button
                  className="table-btn"
                  onClick={() => handleAction("Edit", campaign.title)}
                  aria-label={`Edit ${campaign.title} campaign`}
                >
                  Edit
                </button>
                <button
                  className="table-btn"
                  onClick={() => handleAction("Delete", campaign.title)}
                  aria-label={`Delete ${campaign.title} campaign`}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default CampaignTable;
