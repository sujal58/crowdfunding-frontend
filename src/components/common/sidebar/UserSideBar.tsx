import { useEffect, useState, type ReactNode } from "react";
import "./UserSideBar.css";
import { useNavigate } from "react-router-dom";
import useAuth from "@/Context/AuthContext";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { IoMdArrowDropdown } from "react-icons/io";

interface Tab {
  id: string;
  label: string;
  url: string;
  panel: ReactNode;
}

interface SidebarProps {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  activeSettingsTab: string;
  setActiveSettingsTab: (settingsTab: string) => void;
  setNavigationUrl: (url: string) => void;
}

function UserSideBar({
  tabs,
  activeTab,
  setActiveTab,
  activeSettingsTab,
  setActiveSettingsTab,
}: SidebarProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const navigate = useNavigate();
  const { status } = useAuth();

  const [isVerified, setIsVerified] = useState(
    status === "VERIFIED" ? true : false
  );

  useEffect(() => {
    setIsVerified(status === "VERIFIED" ? true : false);
  }, [status]);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleSettingsTabClick = (settingsTab: string) => {
    setActiveTab("tabSettings");
    setActiveSettingsTab(settingsTab);
    navigate(settingsTab === "profile" ? "setting" : `setting/${settingsTab}`);
  };

  const handleSidebarClick = (tab: Tab) => {
    setActiveTab(tab.id);
    setIsSettingsOpen(false);
    navigate(tab.url);
  };

  const settingsSubmenu = [
    { id: "profile", label: "Profile" },
    { id: "security", label: "Security" },
    { id: "kyc", label: "Manage KYC" },
  ];

  return (
    <aside className="sidebar flex flex-col justify-between items-center">
      <nav aria-label="Dashboard Navigation">
        <ul>
          {tabs.map((tab) => (
            <li key={tab.id}>
              {tab.id === "tabSettings" ? (
                <>
                  <button
                    className={activeTab === tab.id ? "active" : ""}
                    onClick={() => {
                      toggleSettings();
                      setActiveTab(tab.id);
                      setActiveSettingsTab("/setting");
                    }}
                    aria-selected={activeTab === tab.id}
                    aria-expanded={isSettingsOpen}
                    aria-controls="settings-submenu"
                  >
                    {tab.label}{" "}
                    <IoMdArrowDropdown className="inline-block relative left-24" />
                  </button>
                  <ul
                    id="settings-submenu"
                    className={`submenu ${isSettingsOpen ? "open" : "close"}`}
                  >
                    {settingsSubmenu.map((subTab) => (
                      <li key={subTab.id}>
                        <button
                          className={
                            activeSettingsTab === subTab.id &&
                            activeTab === "tabSettings"
                              ? "active"
                              : ""
                          }
                          onClick={() => handleSettingsTabClick(subTab.id)}
                          aria-selected={
                            activeSettingsTab === subTab.id &&
                            activeTab === "tabSettings"
                          }
                        >
                          {subTab.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <button
                  className={activeTab === tab.id ? "active" : ""}
                  onClick={() => handleSidebarClick(tab)}
                  aria-selected={activeTab === tab.id}
                >
                  {tab.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex justify-center w-full border-t-1 border-gray-400">
        <button
          className="btn-create outline outline-black w-11/12 my-3 border-top-2 py-3 bg-blue-600 text-white"
          disabled={!isVerified}
          data-tooltip-content={
            isVerified ? "" : "Verify your kyc to create your first Campaign!"
          }
          data-tooltip-id="myTooltip"
          onClick={() => navigate(`create-campaign`)}
        >
          Create Campaign
        </button>
      </div>
      <ReactTooltip id="myTooltip" />
    </aside>
  );
}

export default UserSideBar;
