import axiosInstance from "@/apis/axios.instance";
import { getDashboardData } from "@/apis/dashboard.api";
import { apiEndpoints } from "@/constant/api.constant";
import type { IDashboardDataResponse } from "@/interfaces/dashboard.interface";
import type { GetSingleResponse } from "@/types";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Index() {
  const [data, setData] = useState<IDashboardDataResponse>();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response: AxiosResponse<
          GetSingleResponse<IDashboardDataResponse>
        > = await getDashboardData();

        if (response.status == 200) {
          setData(response.data.data);
          console.log(response.data.data);
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const message =
            err.response?.data?.data ||
            "Error while fetching dashboard details.";
          toast.error(message);
        } else {
          toast.error("Something went wrong. Please try again.", {
            style: { background: "#fef2f2", color: "#ef4444" },
          });
        }
      }
    };

    fetchDashboardData();
  }, []);
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-blue-600">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your FundSaathi dashboard
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="text-center rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Total Campaigns</h3>
          <p className="text-2xl font-bold">{data?.campaignCount}</p>
        </div>
        <div className="text-center rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Active Campaigns</h3>
          <p className="text-2xl font-bold">{data?.activeCampaignCount}</p>
        </div>
        <div className="text-center rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Total Raised</h3>
          <p className="text-2xl font-bold">${data?.totalDonationRaised}</p>
        </div>
        <div className="text-center rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Donations</h3>
          <p className="text-2xl font-bold">{data?.donationCount}</p>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h3 className="font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            New donation received for "Help Build School"
          </p>
          <p className="text-sm text-muted-foreground">
            Campaign "Medical Fund" reached 75% of goal
          </p>
          <p className="text-sm text-muted-foreground">
            Profile verification completed
          </p>
        </div>
      </div>
    </div>
  );
}

export default Index;
