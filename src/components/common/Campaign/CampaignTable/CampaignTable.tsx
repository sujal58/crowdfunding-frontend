import { toast } from "react-toastify";
import "./CampaignTable.css";
import { useEffect, useState } from "react";
import type { ICampaignResponse } from "@/interfaces/campaign.interface";
import type { AxiosResponse } from "axios";
import type { GetResponse } from "@/types";
import { getAllCampaignByUser } from "@/apis/campaign.api";
import axios from "axios";
import { ECampaignStatus } from "@/enums";

function CampaignTable() {
  const [campaigns, setCampaigns] = useState<ICampaignResponse[]>();
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response: AxiosResponse<GetResponse<ICampaignResponse>> =
          await getAllCampaignByUser();
        if (response.status == 200) {
          setCampaigns(response.data.data);
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const message =
            err.response?.data?.data || "Error while fetching active campaign.";
          toast.error(message);
        } else {
          toast.error("Something went wrong. Please try again.", {
            style: { background: "#fef2f2", color: "#ef4444" },
          });
        }
      }
    };

    fetchCampaign();
  }, []);

  const handleAction = (action: string, campaign: string) => {
    console.log(`${action} campaign: ${campaign}`);
    toast.info(`${action} ${campaign}`, {
      style: { background: "#eff6ff", color: "#2563eb" },
    });
  };

  return (
    <section aria-labelledby="campaignsHeading">
      <h2
        id="campaignsHeading"
        className="text-center text-2xl mb-6 font-bold text-blue-600"
      >
        My Campaigns
      </h2>
      <table aria-label="User campaigns">
        <thead>
          <tr>
            <th>Title</th>
            <th>Goal</th>
            <th>Raised</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns &&
            campaigns.map((campaign) => (
              <tr key={campaign.title}>
                <td>{campaign.title}</td>
                <td>{campaign.goalAmount}</td>
                <td>{campaign.currentAmount}</td>
                <td
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
                <td>
                  <button
                    className="table-btn"
                    onClick={() => handleAction("Edit", campaign.title)}
                    aria-label={`Edit ${campaign.title} campaign`}
                  >
                    Edit
                  </button>
                  <button
                    className="table-btn"
                    onClick={() => handleAction("Delete", campaign.title)}
                    aria-label={`Delete ${campaign.title} campaign`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}

export default CampaignTable;
