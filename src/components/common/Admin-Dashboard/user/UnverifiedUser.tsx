import React from "react";
import CampaignTable from "../CampaignTable";

const UnverifiedUsers: React.FC = () => {
  const campaigns = [
    {
      id: 1,
      username: "Jane Smith",
      email: "janesmith@test.com",
      status: "Pending",
      submissionDate: "2025-05-08",
    },
    {
      id: 3,
      username: "Jane Smith",
      email: "janesmith@test.com",
      status: "Rejected",
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
    console.log(`Action ${action} on unverified user ${id}, reason: ${reason}`);
    alert(`${action} successful!`);
  };

  return (
    <CampaignTable
      type="unverifiedUsers"
      campaigns={campaigns}
      getActions={getActions}
    />
  );
};

export default UnverifiedUsers;
