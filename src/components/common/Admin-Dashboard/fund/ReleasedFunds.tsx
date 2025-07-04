import React from "react";
import FundTable from "../table/FundTable";
import type { Fund } from "@/types";

const PendingReleases: React.FC = () => {
  const fundSamples: Fund[] = [
    {
      id: 1,
      campaign: "Clean Water for All",
      campaigner: "Alice Johnson",
      amount: "5000",
      releaseDate: "2025-06-15",
      status: "Released",
    },
    {
      id: 2,
      campaign: "Education for Girls",
      campaigner: "Mohammed El-Sayed",
      amount: "3000",
      scheduledDate: "2025-07-10",
      status: "Pending",
    },
    {
      id: 3,
      campaign: "Disaster Relief Fund",
      campaigner: "Rachel Green",
      amount: "7000",
      status: "Held",
    },
  ];

  const getActions = (campaign: any) => (
    <>
      <button
        className="table-btn view-btn"
        onClick={() => handleAction(campaign.id, "View details")}
      >
        View Details
      </button>
    </>
  );

  const handleAction = (id: number, action: string, reason?: string | null) => {
    console.log(`Action ${action} on pending release ${id}, reason: ${reason}`);
    alert(`${action} successful!`);
  };

  return (
    <FundTable
      type="releasedFunds"
      funds={fundSamples}
      getActions={getActions}
    />
  );
};

export default PendingReleases;
