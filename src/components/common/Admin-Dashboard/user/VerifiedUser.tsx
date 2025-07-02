import React from "react";
import CampaignTable from "../CampaignTable";

const VerifiedUsers: React.FC = () => {
  const campaigns = [
    {
      id: 2,
      username: "Jane Smith",
      email: "janesmith@test.com",
      status: "Approved",
      submissionDate: "2025-05-08",
    },
  ];

  const getActions = (campaign: any) => (
    <button
      className="table-btn view-btn"
      onClick={() => handleAction(campaign.id, "View")}
    >
      View Details
    </button>
  );

  const handleAction = (id: number, action: string, reason?: string | null) => {
    console.log(`Action ${action} on verified user ${id}, reason: ${reason}`);
    alert(`${action} successful!`);
  };

  return (
    <CampaignTable
      type="verifiedUsers"
      campaigns={campaigns}
      getActions={getActions}
    />
  );
};

export default VerifiedUsers;
