import { getAdminDashboardData } from "@/apis/dashboard.api";
import type { IAdminDashboardDataResponse } from "@/interfaces/dashboard.interface";
import type { GetSingleResponse } from "@/types";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MetricsPanel: React.FC = () => {
  const [data, setData] = useState<IAdminDashboardDataResponse>();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response: AxiosResponse<
          GetSingleResponse<IAdminDashboardDataResponse>
        > = await getAdminDashboardData();

        if (response.status == 200) {
          setData(response.data.data);
        }
      } catch (err: unknown) {
        console.log(err);
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
    <>
      <h2 className="text-3xl text-center font-extrabold mb-6 text-[#2563eb]"></h2>
      <div className="space-y-6">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-blue-600">Platform Metrics</h1>
          <p className="text-muted-foreground">Welcome to Admin dashboard</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="text-center rounded-lg border bg-card p-6">
            <h3 className="font-semibold">Total Campaigns</h3>
            <p className="text-2xl font-bold">{data?.campaignCount}</p>
          </div>
          <div className="text-center rounded-lg border bg-card p-6">
            <h3 className="font-semibold">Total Donations</h3>
            <p className="text-2xl font-bold">${data?.donationAmount}</p>
          </div>
          <div className="text-center rounded-lg border bg-card p-6">
            <h3 className="font-semibold">Total Users</h3>
            <p className="text-2xl font-bold">{data?.totalUser}</p>
          </div>
          <div className="text-center rounded-lg border bg-card p-6">
            <h3 className="font-semibold">Pending KYC</h3>
            <p className="text-2xl font-bold">{data?.pendingKyc}</p>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              New User created -sujal58
            </p>
            <p className="text-sm text-muted-foreground">
              Campaign "Medical Fund" reached 75% of goal
            </p>
            <p className="text-sm text-muted-foreground">
              Please take action against pending Kyc.
            </p>
          </div>
        </div>
      </div>
      {/* <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <h3 className="text-3xl font-bold text-blue-600 lg:text-4xl">
            {data?.campaignCount}
          </h3>
          <p className="text-gray-500 mt-2">Total Campaigns</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <h3 className="text-2xl font-bold text-blue-600 lg:text-4xl">
            ${data?.donationAmount}
          </h3>
          <p className="text-gray-500 mt-2">Total Donations</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <h3 className="text-3xl font-bold text-blue-600 lg:text-4xl">
            {data?.totalUser}
          </h3>
          <p className="text-gray-500 mt-2">Total Users</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <h3 className="text-3xl font-bold text-blue-600 lg:text-4xl">
            {data?.pendingKyc}
          </h3>
          <p className="text-gray-500 mt-2">Pending KYC</p>
        </div>
      </div> */}
    </>
  );
};

export default MetricsPanel;
