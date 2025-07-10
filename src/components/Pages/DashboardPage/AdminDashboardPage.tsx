import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import AuthHeader from "../../common/Header/AuthHeader";
import AdminSidebar from "../../common/sidebar/AdminSidebar";
import "./DashboardPage.css";
import Modal from "@/components/common/Admin-Dashboard/Modal";

const AdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("tabMetrics");
  const [activeSubmenu, setactiveSubmenu] = useState("");
  const [modalData, setModalData] = useState<{
    type: string;
    data?: any;
  } | null>(null);

  const openModal = (type: string, data?: any) => setModalData({ type, data });
  const closeModal = () => setModalData(null);

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
      id: "tabCampaign",
      label: "Campaign",
      path: "/campaign",
      submenu: [
        {
          id: "tabApprovedCampaigns",
          label: "Active Campaigns",
          path: "/",
        },
        {
          id: "tabPendingCampaigns",
          label: "Pending Campaigns",
          path: "/pending",
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
        {
          id: "tabCompletedCampaigns",
          label: "Completed Campaigns",
          path: "/completed",
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
        <main>
          <Outlet context={{ openModal, closeModal }} />
          {modalData && (
            <Modal
              type={modalData.type}
              data={modalData.data}
              onClose={closeModal}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
