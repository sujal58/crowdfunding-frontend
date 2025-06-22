import { useState, type ReactNode } from "react";
import "./UserSideBar.css";

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
  setNavigationUrl,
}: SidebarProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleSettingsTabClick = (settingsTab: string) => {
    setActiveTab("tabSettings");
    setActiveSettingsTab(settingsTab);
    setNavigationUrl(
      settingsTab === "profile" ? "setting" : `setting/${settingsTab}`
    );
  };

  const handleSidebarClick = (tab: Tab) => {
    console.log(tab);
    setActiveTab(tab.id);
    setIsSettingsOpen(false);
    setNavigationUrl(tab.url);
  };

  const settingsSubmenu = [
    { id: "profile", label: "Profile" },
    { id: "security", label: "Security" },
    { id: "kyc", label: "Manage KYC" },
  ];

  return (
    <aside className="sidebar">
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
                    {tab.label}
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
    </aside>
  );
}

export default UserSideBar;
