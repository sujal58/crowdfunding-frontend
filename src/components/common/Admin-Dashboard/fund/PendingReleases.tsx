import React from "react";
import CampaignTable from "../CampaignTable";

const PendingReleases: React.FC = () => {
  const campaigns = [
    {
      id: 1,
      title: "Clean Water for All",
      creator: "John Doe",
      goal: "$1,000",
      status: "Pending",
      scheduledDate: "2025-05-19",
    },
    {
      id: 3,
      title: "Education for Every Child",
      creator: "Jane Smith",
      goal: "$500",
      status: "Held",
      scheduledDate: "2025-05-19",
    },
  ];

  const getActions = (campaign: any) => (
    <>
      <button
        className="table-btn view-btn"
        onClick={() => handleAction(campaign.id, "View")}
      >
        View Details
      </button>
      <button
        className="table-btn release-btn"
        onClick={() => handleAction(campaign.id, "Release")}
      >
        Release
      </button>
      <button
        className="table-btn hold-btn"
        onClick={() => handleAction(campaign.id, "Hold", prompt("Reason?"))}
        disabled={campaign.status === "Held"}
      >
        Hold
      </button>
    </>
  );

  const handleAction = (id: number, action: string, reason?: string | null) => {
    console.log(`Action ${action} on pending release ${id}, reason: ${reason}`);
    alert(`${action} successful!`);
  };

  return (
    <CampaignTable
      type="pendingReleases"
      campaigns={campaigns}
      getActions={getActions}
    />
  );
};

export default PendingReleases;
