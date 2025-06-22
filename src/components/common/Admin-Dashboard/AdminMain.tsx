import React, { useState } from "react";
import MetricsPanel from "./MetricsPanel";
import CampaignTable from "./CampaignTable";
import NotificationPanel from "./NotificationPanel";
import Modal from "./Modal";

interface AdminMainProps {
  activeTab: string;
}

const AdminMain: React.FC<AdminMainProps> = ({ activeTab }) => {
  const [modalData, setModalData] = useState<{
    type: string;
    data?: any;
  } | null>(null);

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
    <main className="flex-1 p-8 overflow-y-auto">
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
      {modalData && (
        <Modal
          type={modalData.type}
          data={modalData.data}
          onClose={() => setModalData(null)}
        />
      )}
    </main>
  );
};

export default AdminMain;
