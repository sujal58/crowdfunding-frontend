import { useEffect, useState } from "react";
import CampaignCard from "../../../ui/CampaignCard/CampaignCard";
import "./DashboardCampaign.css";
import type { AxiosResponse } from "axios";
import type { GetResponse } from "@/types";
import type { ICampaignResponse } from "@/interfaces/campaign.interface";
import { getAllCampaignByStatus } from "@/apis/campaign.api";
import { toast } from "react-toastify";
import axios from "axios";
import { ECampaignStatus } from "@/enums";

function DashboardCampign() {
  // const campaigns = [
  //   {
  //     id: 1,
  //     title: "Clean Water for All",
  //     description:
  //       "Providing clean drinking water to rural communities in need.",
  //     creator: "WaterHope NGO",
  //     goal: 10000,
  //     progress: 78,
  //     image:
  //       "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  //   },
  //   {
  //     id: 2,
  //     title: "Education for Every Child",
  //     description:
  //       "Funding school supplies and scholarships for underprivileged kids.",
  //     creator: "LearnBright Foundation",
  //     goal: 15000,
  //     progress: 36,
  //     image:
  //       "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=600&q=80",
  //   },
  //   {
  //     id: 3,
  //     title: "Medical Aid in Remote Areas",
  //     description: "Supplying medical equipment to underserved regions.",
  //     creator: "HealthReach Org",
  //     goal: 12000,
  //     progress: 72,
  //     image:
  //       "https://images.unsplash.com/photo-1533553502768-f7ad9f9ccfe8?auto=format&fit=crop&w=600&q=80",
  //   },
  //   {
  //     id: 4,
  //     title: "Reforestation Project",
  //     description: "Planting trees to combat deforestation and climate change.",
  //     creator: "GreenFuture Initiative",
  //     goal: 20000,
  //     progress: 69,
  //     image:
  //       "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80",
  //   },
  // ];

  const [campaigns, setCampaigns] = useState<ICampaignResponse[]>([]);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response: AxiosResponse<GetResponse<ICampaignResponse>> =
          await getAllCampaignByStatus(ECampaignStatus.ACTIVE);
        if (response.status == 200) {
          setCampaigns(response.data.data);
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const message =
            err.response?.data?.data ||
            "Error while fetching suspicious campaign.";
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

  const handleDonate = (amount: number, customAmount?: number) => {
    console.log(
      `Donated $${amount}${customAmount ? ` (custom: $${customAmount})` : ""}`
    );

    alert("Donation processed successfully!");
  };

  return (
    <div className="dashboard-campaignGrid">
      <h2 className="campaign-grid-heading">Campaigns</h2>
      <section className="campaign-grid" aria-label="Featured Campign">
        {campaigns.map((value) => {
          const goal = (value.currentAmount / value.goalAmount) * 100;

          return (
            <CampaignCard
              key={value.id}
              campaignId={value.id}
              title={value.title}
              description={value.description}
              creator={value.username}
              goal={value.goalAmount}
              progress={goal}
              image={value.campaignImage}
              onDonate={handleDonate}
            />
          );
        })}
      </section>
    </div>
  );
}

export default DashboardCampign;
