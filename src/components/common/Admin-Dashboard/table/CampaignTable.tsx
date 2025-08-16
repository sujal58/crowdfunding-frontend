import React from "react";
import type { ICampaignResponse } from "@/interfaces/campaign.interface";
import { ECampaignStatus } from "@/enums";
import { toast } from "react-toastify";
import axios from "axios";
import { changeCampaignStatus } from "@/apis/campaign.api";

interface CampaignTableProps {
  type: string;
  campaigns: ICampaignResponse[];
  onRefresh: () => void;
}

const CampaignTable: React.FC<CampaignTableProps> = ({
  type,
  campaigns,
  onRefresh,
}) => {
  const getActions = (campaign: any) => {
    switch (type) {
      case "Active":
        return (
          <>
            <button
              className="table-btn flag-btn"
              onClick={() => handleAction(campaign.id, "Details")}
            >
              View Details
            </button>
            <button
              className="table-btn flag-btn"
              onClick={() => handleAction(campaign.id, "Flag")}
            >
              Flag
            </button>
          </>
        );
      case "Completed":
        return (
          <>
            <button
              className="table-btn flag-btn"
              onClick={() => handleAction(campaign.id, "Details")}
            >
              View Report
            </button>
          </>
        );
      case "Pending":
        return (
          <>
            <button
              className="table-btn approve-btn"
              onClick={() => handleAction(campaign.id, "Approve")}
            >
              Approve
            </button>
            <button
              className="table-btn reject-btn"
              onClick={() => handleAction(campaign.id, "Reject")}
            >
              Reject
            </button>
            <button
              className="table-btn flag-btn"
              onClick={() => handleAction(campaign.id, "Flag")}
            >
              Flag
            </button>
          </>
        );
      case "Suspicious":
        return (
          <>
            <button
              className="table-btn approve-btn"
              onClick={() => handleAction(campaign.id, "Approve")}
            >
              Approve
            </button>
            <button
              className="table-btn reject-btn"
              onClick={() => handleAction(campaign.id, "Reject")}
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
      case "Unapproved":
        return (
          <>
            <button
              className="table-btn approve-btn"
              onClick={() => handleAction(campaign.id, "Approve")}
            >
              Approve
            </button>
            <button
              className="table-btn flag-btn"
              onClick={() => handleAction(campaign.id, "Details")}
            >
              View Details
            </button>
          </>
        );
      default:
        return null;
    }
  };

  const handleAction = async (campaignId: number, action: string) => {
    try {
      if (action === "Details") {
        // Placeholder for viewing campaign details
        // openModal("campaignDetails", campaign);
      } else if (action === "Approve") {
        changeStatusOfCampaign(campaignId, ECampaignStatus.ACTIVE);
      } else if (action === "Reject") {
        changeStatusOfCampaign(campaignId, ECampaignStatus.CANCELLED);
      } else if (action === "Flag") {
        changeStatusOfCampaign(campaignId, ECampaignStatus.SUSPICIOUS);
      } else if (action === "Clear") {
        changeStatusOfCampaign(campaignId, ECampaignStatus.ACTIVE);
      }
    } catch (err: unknown) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data.data ||
            `Failed to ${action.toLowerCase()} campaign`,
          {
            style: { background: "#fef2f2", color: "#ef4444" },
          }
        );
      } else {
        toast.error("Something went wrong. Please try again.", {
          style: { background: "#fef2f2", color: "#ef4444" },
        });
      }
    }
  };

  const changeStatusOfCampaign = async (
    campaignId: number,
    status: ECampaignStatus
  ) => {
    const notice =
      status === ECampaignStatus.SUSPICIOUS ? "flagged" : status.toLowerCase();
    try {
      const response = await changeCampaignStatus(campaignId, status);
      if (response.status === 200) {
        toast.success(`Campaign ${campaignId} ${notice} successfully`, {
          style: { background: "#f0fdf4", color: "#22c55e" },
        });
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data || "Error updating Campaign status.";
        toast.error(message);
      } else {
        toast.error("Something went wrong. Please try again.", {
          style: { background: "#fef2f2", color: "#ef4444" },
        });
      }
    } finally {
      onRefresh && onRefresh();
    }
  };

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
              <td className="border border-gray-300 p-3">
                {campaign.username}
              </td>
              <td className="border border-gray-300 p-3">
                {campaign.goalAmount}
              </td>
              <td
                className="border border-gray-300 p-3"
                style={{
                  color:
                    campaign.status === ECampaignStatus.ACTIVE
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
