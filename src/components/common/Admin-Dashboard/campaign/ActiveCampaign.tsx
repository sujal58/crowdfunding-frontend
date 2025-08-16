import React, { useEffect, useState } from "react";
import CampaignTable from "../table/CampaignTable";
import type { GetResponse, UserOutletContextType } from "@/types";
import type { ICampaignResponse } from "@/interfaces/campaign.interface";
import type { AxiosResponse } from "axios";
import { getAllCampaignByStatus } from "@/apis/campaign.api";
import { ECampaignStatus } from "@/enums";
import { toast } from "react-toastify";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

const ActiveCampaign: React.FC = () => {
  const [campaign, setCampaign] = useState<ICampaignResponse[]>([]);
  const { doRefresh, refreshFlag } = useOutletContext<UserOutletContextType>();

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response: AxiosResponse<GetResponse<ICampaignResponse>> =
          await getAllCampaignByStatus(ECampaignStatus.ACTIVE);
        if (response.status == 200) {
          setCampaign(response.data.data);
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
  }, [refreshFlag]);

  return (
    <CampaignTable type="Active" campaigns={campaign} onRefresh={doRefresh} />
  );
};

export default ActiveCampaign;
