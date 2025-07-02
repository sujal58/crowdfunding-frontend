import React from "react";
import CampaignTable from "../CampaignTable";

const SuspiciousCampaigns: React.FC = () => {
  const campaigns = [
    {
      id: 3,
      title: "Quick Fundraiser",
      creator: "Bob Wilson",
      goal: "$5,000",
      status: "Suspicious",
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
        className="table-btn clear-btn"
        onClick={() => handleAction(campaign.id, "Clear")}
      >
        Clear Flag
      </button>
    </>
  );

  const handleAction = (id: number, action: string, reason?: string | null) => {
    console.log(`Action ${action} on suspicious item ${id}, reason: ${reason}`);
    alert(`${action} successful!`);
  };

  return (
    <CampaignTable
      type="suspicious"
      campaigns={campaigns}
      getActions={getActions}
    />
  );
};

export default SuspiciousCampaigns;
