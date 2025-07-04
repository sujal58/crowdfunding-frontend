import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import AuthHeader from "../../common/Header/AuthHeader";
import AdminSidebar from "../../common/sidebar/AdminSidebar";
import "./DashboardPage.css";

const AdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("tabMetrics");
  const [activeSubmenu, setactiveSubmenu] = useState("");

  const tabs = [
    { id: "tabMetrics", label: "Metrics", path: "/" },
    {
      id: "tabUser",
      label: "User",
      path: "/user",
      submenu: [
        {
          id: "tabVerifiedUsers",
          label: "Verified Users",
          path: "/",
        },
        {
          id: "tabUnverifiedUsers",
          label: "Unverified Users",
          path: "/unverified",
        },
        {
          id: "tabRejectedUsers",
          label: "Rejected Users",
          path: "/rejected",
        },
      ],
    },
    {
      id: "tabFund",
      label: "Fund",
      path: "/fund",
      submenu: [
        {
          id: "tabReleasedFunds",
          label: "Released Funds",
          path: "/",
        },
        {
          id: "tabPendingReleases",
          label: "Pending Releases",
          path: "/pending",
        },
      ],
    },
    {
      id: "tabCampaign",
      label: "Campaign",
      path: "/campaign",
      submenu: [
        {
          id: "tabApprovedCampaigns",
          label: "Approved Campaigns",
          path: "/",
        },
        {
          id: "tabUnapprovedCampaigns",
          label: "Unapproved Campaigns",
          path: "/unapproved",
        },
        {
          id: "tabSuspiciousCampaigns",
          label: "Suspicious Campaigns",
          path: "/suspicious",
        },
      ],
    },
    { id: "tabNotifications", label: "Notifications", path: "/notifications" },
  ];

  return (
    <div>
      <AuthHeader />
      <div className="dashboard-container mx-4 my-2 bg-white rounded-xl shadow-lg min-h-[90vh] overflow-hidden flex">
        <AdminSidebar
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeSubmenu={activeSubmenu}
          setActiveSubmenu={setactiveSubmenu}
        />
        <main>{<Outlet />}</main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
