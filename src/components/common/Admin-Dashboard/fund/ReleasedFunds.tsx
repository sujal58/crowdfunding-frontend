import React from "react";
import CampaignTable from "../CampaignTable";

const ReleasedFunds: React.FC = () => {
  const campaigns = [
    {
      id: 1,
      title: "Education for Every Child",
      creator: "Jane Smith",
      goal: "$2,000",
      status: "Released",
      scheduledDate: "2025-05-12",
    },
    {
      id: 2,
      title: "Education for Every Child",
      creator: "Jane Smith",
      goal: "$1,000",
      status: "Released",
      scheduledDate: "2025-05-05",
    },
  ];

  const getActions = () => null;

  return (
    <CampaignTable
      type="releasedFunds"
      campaigns={campaigns}
      getActions={getActions}
    />
  );
};

export default ReleasedFunds;
