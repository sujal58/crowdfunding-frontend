import Sidebar from "../../common/sidebar/UserSideBar.tsx";
import Settings from "../../common/User-dashboard/Setting/Setting.tsx";
import { useEffect, useState } from "react";
import AuthHeader from "../../common/Header/AuthHeader.js";
import CampaignTable from "../../common/Campaign/CampignTable/CampaignTable.tsx";
import Notifications from "../../ui/Notification/Notification.tsx";
import DonationFeed from "../../ui/Donation/DonationFeed.tsx";
import "./DashboardPage.css";
import DashboardCampign from "../../common/User-dashboard/DashboardCampign/DashboardCampaign.tsx";
import { Outlet, useNavigate } from "react-router-dom";

function DashboardPage() {
  const [activeTab, setActiveTab] = useState("tabCampaigns");
  const [activeSettingsTab, setActiveSettingsTab] = useState("profile");
  const [navigationUrl, setNavigationUrl] = useState("/user-dashboard");

  const navigate = useNavigate();

  useEffect(() => {
    navigate(navigationUrl);
  }, [navigationUrl]);

  const tabs = [
    {
      id: "tabCampaigns",
      label: "My Campaigns",
      url: "/user-dashboard",
      panel: <CampaignTable />,
    },
    {
      id: "tabDonations",
      label: "My Donations",
      url: "/user-dashboard/donations",
      panel: <DonationFeed />,
    },
    {
      id: "tabBrowse",
      label: "Browse Campaigns",
      url: "/user-dashboard/campaigns",
      panel: <DashboardCampign />,
    },
    {
      id: "tabSettings",
      label: "Settings",
      url: "/user-dashboard/setting",
      panel: <Settings />,
      // activeSettingsTab = { activeSettingsTab },
    },
    {
      id: "tabNotifications",
      label: "Notifications",
      url: "/user-dashboard/notification",
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
          setNavigationUrl={setNavigationUrl}
        />
        <main>
          <Outlet />
        </main>

        {/* {isNestedRoute ? (
          <Outlet />
        ) : (
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
        )} */}
      </div>
    </>
  );
}

export default DashboardPage;
