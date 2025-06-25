import { useState } from "react";
import AuthHeader from "../common/Header/AuthHeader";
import AdminSidebar from "../common/sidebar/AdminSidebar";
import CampaignTable from "../common/Admin-Dashboard/CampaignTable";
import NotificationPanel from "../common/Admin-Dashboard/NotificationPanel";
import MetricsPanel from "../common/Admin-Dashboard/MetricsPanel";
import "./DashboardPage/DashboardPage.css";

function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("tabMetrics");

  // const tabs = [
  //   "tabMetrics",
  //   "tabApprovedCampaigns",
  //   "tabUnapprovedCampaigns",
  //   "tabSuspiciousCampaigns",
  //   "tabVerifiedUsers",
  //   "tabUnverifiedUsers",
  //   "tabReleasedFunds",
  //   "tabPendingReleases",
  //   "tabNotifications",
  // ].map((id) => ({
  //   id,
  //   label: id
  //     .replace("tab", "")
  //     .replace(/([A-Z])/g, " $1")
  //     .trim(),
  //   panelId: `panel${id.replace("tab", "")}`,
  // }));

  const tabs = [
    { id: "tabMetrics", label: "Metrics", panel: <MetricsPanel /> },
    {
      id: "tabApprovedCampaigns",
      label: "Approved Campaigns",
      panel: <CampaignTable type="approved" />,
    },
    {
      id: "tabUnapprovedCampaigns",
      label: "Unapproved Campaigns",
      panel: <CampaignTable type="unapproved" />,
    },
    {
      id: "tabSuspiciousCampaigns",
      label: "Suspicious Campaigns",
      panel: <CampaignTable type="suspicious" />,
    },
    {
      id: "tabVerifiedUsers",
      label: "Verified Users",
      panel: <CampaignTable type="verifiedUsers" />,
    },
    {
      id: "tabUnverifiedUsers",
      label: "Unverified Users",
      panel: <CampaignTable type="unverifiedUsers" />,
    },
    {
      id: "tabReleasedFunds",
      label: "Released Funds History",
      panel: <CampaignTable type="releasedFunds" />,
    },
    {
      id: "tabPendingReleases",
      label: "Pending Releases",
      panel: <CampaignTable type="pendingReleases" />,
    },
    {
      id: "tabNotifications",
      label: "Notifications",
      panel: <NotificationPanel />,
    },
  ];
  return (
    <div className="min-h-screen bg-gray-100">
      <AuthHeader />
      <div className="dashboard-container" style={{ display: "flex" }}>
        <AdminSidebar
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <main className="mx-6">
          {tabs.map((tab) => (
            <section
              key={tab.id}
              role="tabpanel"
              id={`panel${tab.id.replace("tab", "")}`}
              aria-labelledby={tab.id}
              hidden={activeTab !== tab.id}
              className="tab-panel"
            >
              {tab.panel}
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
