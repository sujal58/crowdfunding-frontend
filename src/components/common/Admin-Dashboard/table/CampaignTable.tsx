import React from "react";
import type { Campaign } from "@/types/index";

interface CampaignTableProps {
  type: "unapproved" | "approved" | "suspicious";
  campaigns: Campaign[];
  getActions: (campaign: Campaign) => React.ReactNode;
}

const CampaignTable: React.FC<CampaignTableProps> = ({
  type,
  campaigns,
  getActions,
}) => {
  return (
    <>
      <h2 className="text-3xl text-center font-extrabold mb-6 text-[#2563eb]">
        {type.replace(/([A-Z])/g, " $1").trim()} Campaigns
      </h2>
      <table className="w-full border-collapse mb-6 text-sm">
        <thead>
          <tr>
            <th className="border border-gray-300 p-3 bg-gray-100">Title</th>
            <th className="border border-gray-300 p-3 bg-gray-100">Creator</th>
            <th className="border border-gray-300 p-3 bg-gray-100">Goal</th>
            <th className="border border-gray-300 p-3 bg-gray-100">Status</th>
            <th className="border border-gray-300 p-3 bg-gray-100">Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign.id} className="hover:bg-blue-100">
              <td className="border border-gray-300 p-3">{campaign.title}</td>
              <td className="border border-gray-300 p-3">{campaign.creator}</td>
              <td className="border border-gray-300 p-3">{campaign.goal}</td>
              <td
                className="border border-gray-300 p-3"
                style={{
                  color:
                    campaign.status === "Active"
                      ? "#22c55e"
                      : campaign.status === "Pending"
                      ? "#f59e0b"
                      : "#ef4444",
                }}
              >
                {campaign.status}
              </td>
              <td className="border border-gray-300 p-3">
                {getActions(campaign)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CampaignTable;
