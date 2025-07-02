import React from "react";
import CampaignTable from "../CampaignTable";

const ApprovedCampaigns: React.FC = () => {
  const campaigns = [
    {
      id: 2,
      title: "Education for Every Child",
      creator: "Jane Smith",
      goal: "$15,000",
      status: "Active",
    },
  ];

  const getActions = (campaign: any) => (
    <>
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
    console.log(`Action ${action} on approved item ${id}, reason: ${reason}`);
    alert(`${action} successful!`);
  };

  return (
    <CampaignTable
      type="approved"
      campaigns={campaigns}
      getActions={getActions}
    />
  );
};

export default ApprovedCampaigns;
