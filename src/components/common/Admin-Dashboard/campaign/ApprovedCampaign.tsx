import React from "react";
import CampaignTable from "../table/CampaignTable";
import type { Campaign } from "@/types";

const ApprovedCampaigns: React.FC = () => {
  const campaignSamples: Campaign[] = [
    {
      id: 1,
      title: "Build a School in Nepal",
      creator: "Suman Rai",
      email: "suman.rai@example.com",
      goal: "20000",
      status: "Active",
      submissionDate: "2025-06-01",
    },
    {
      id: 2,
      title: "Women Empowerment Workshop",
      creator: "Fatima Noor",
      email: "fatima.noor@example.com",
      goal: "5000",
      status: "Pending",
      submissionDate: "2025-07-01",
    },
    {
      id: 3,
      title: "Support for Flood Victims",
      creator: "John Carter",
      email: "john.carter@example.com",
      goal: "15000",
      status: "Suspended",
      submissionDate: "2025-05-25",
    },
    {
      id: 4,
      title: "Free Coding Bootcamp",
      creator: "Amina Yusuf",
      email: "amina.yusuf@example.com",
      goal: "10000",
      status: "Active",
      submissionDate: "2025-06-15",
    },
    {
      id: 5,
      title: "Healthcare Access for Rural Areas",
      creator: "Carlos Mendoza",
      email: "carlos.mendoza@example.com",
      goal: "25000",
      status: "Pending",
      submissionDate: "2025-07-03",
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
      type="suspicious"
      campaigns={campaignSamples}
      getActions={getActions}
    />
  );
};

export default ApprovedCampaigns;
