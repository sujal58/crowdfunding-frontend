import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import AuthHeader from "../../common/Header/AuthHeader";
import AdminSidebar from "../../common/sidebar/AdminSidebar";
import "./DashboardPage.css";

const AdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("tabMetrics");
  const [activeSubmenu, setactiveSubmenu] = useState("");

  const navigate = useNavigate();

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

  // const handleTabChange = (tabId: string) => {
  //   const tab =
  //     tabs.find((t) => t.id === tabId) ||
  //     tabs.find((t) => t.submenu?.some((s) => s.id === tabId));
  //   if (tab?.path) navigate(tab.path);
  //   else if (tab?.submenu?.some((s) => s.id === tabId)) {
  //     const subTab = tab.submenu.find((s) => s.id === tabId);
  //     if (subTab?.path) navigate(subTab.path);
  //   }
  //   setActiveTab(tabId);
  // };

  return (
    <div>
      <AuthHeader />
      <div className="dashboard-container mx-auto my-8 bg-white rounded-xl shadow-lg min-h-[600px] overflow-hidden flex">
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
