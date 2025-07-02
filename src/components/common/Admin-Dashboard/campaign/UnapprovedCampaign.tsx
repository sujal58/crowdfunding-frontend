import React from "react";
import CampaignTableBase from "../CampaignTable";
const UnapprovedCampaigns: React.FC = () => {
  const campaigns = [
    {
      id: 1,
      title: "Clean Water for All",
      creator: "John Doe",
      goal: "$10,000",
      status: "Pending",
    },
  ];

  const getActions = (campaign: any) => (
    <>
      <button
        className="table-btn approve-btn"
        onClick={() => handleAction(campaign.id, "Approve")}
      >
        Approve
      </button>
      <button
        className="table-btn reject-btn"
        onClick={() => handleAction(campaign.id, "Reject", prompt("Reason?"))}
      >
        Reject
      </button>
      <button
        className="table-btn flag-btn"
        onClick={() => handleAction(campaign.id, "Flag", prompt("Reason?"))}
      >
        Flag
      </button>
    </>
  );

  const handleAction = (id: number, action: string, reason?: string | null) => {
    console.log(`Action ${action} on unapproved item ${id}, reason: ${reason}`);
    alert(`${action} successful!`);
  };

  return (
    <CampaignTableBase
      type="unapproved"
      campaigns={campaigns}
      getActions={getActions}
    />
  );
};

export default UnapprovedCampaigns;
