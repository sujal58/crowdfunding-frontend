import Sidebar from "../../common/sidebar/UserSideBar.tsx";
import Settings from "../../common/Setting/Setting.tsx";
import { useState } from "react";
import AuthHeader from "../../common/Header/AuthHeader.js";
import CampaignTable from "../../common/Campaign/CampignTable/CampaignTable.tsx";
import Notifications from "../../ui/Notification/Notification.tsx";
import DonationFeed from "../../ui/Donation/DonationFeed.tsx";
import "./DashboardPage.css";
import DashboardCampign from "../../common/Campaign/DashboardCampign/DashboardCampaign.tsx";

function DashboardPage() {
  const [activeTab, setActiveTab] = useState("tabCampaigns");
  const [activeSettingsTab, setActiveSettingsTab] = useState("profile");

  const tabs = [
    {
      id: "tabCampaigns",
      label: "My Campaigns",
      panel: <CampaignTable />,
    },
    {
      id: "tabDonations",
      label: "My Donations",
      panel: <DonationFeed />,
    },
    {
      id: "tabBrowse",
      label: "Browse Campaigns",
      panel: <DashboardCampign />,
    },
    {
      id: "tabSettings",
      label: "Settings",
      panel: <Settings activeSettingsTab={activeSettingsTab} />,
    },
    {
      id: "tabNotifications",
      label: "Notifications",
      panel: <Notifications />,
    },
  ];

  return (
    <>
      <AuthHeader />
      <div className="dashboard-container" style={{ display: "flex" }}>
        <Sidebar
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeSettingsTab={activeSettingsTab}
          setActiveSettingsTab={setActiveSettingsTab}
        />
        <main>
          {tabs.map((tab) => (
            <section
              key={tab.id}
              role="tabpanel"
              id={`panel${tab.id.replace("tab", "")}`}
              aria-labelledby={tab.id}
              hidden={activeTab !== tab.id}
            >
              {tab.panel}
            </section>
          ))}
        </main>
      </div>
    </>
  );
}

export default DashboardPage;
