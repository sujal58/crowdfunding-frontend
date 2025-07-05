import React, { useEffect, useState } from "react";
import CampaignTable from "../table/CampaignTable";
import type { GetResponse } from "@/types";
import type { ICampaignResponse } from "@/interfaces/campaign.interface";
import type { AxiosResponse } from "axios";
import { getAllCampaignByStatus } from "@/apis/campaign.api";
import { ECampaignStatus } from "@/enums";
import { toast } from "react-toastify";
import axios from "axios";

const PendingCampaign: React.FC = () => {
  const [campaign, setCampaign] = useState<ICampaignResponse[]>([]);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response: AxiosResponse<GetResponse<ICampaignResponse>> =
          await getAllCampaignByStatus(ECampaignStatus.PENDING);
        if (response.status == 200) {
          setCampaign(response.data.data);
          response.data.data.length == 0 &&
            toast.warn("No Pending campaign exist!");
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const message =
            err.response?.data?.data ||
            "Error while fetching pending campaign.";
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
    <CampaignTable
      type={ECampaignStatus.PENDING}
      campaigns={campaign}
      getActions={getActions}
    />
  );
};

export default PendingCampaign;
