import { useState, type ReactNode } from "react";
import "./UserSideBar.css";

interface Tab {
  id: string;
  label: string;
  panel: ReactNode;
}

interface SidebarProps {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  activeSettingsTab: string;
  setActiveSettingsTab: (settingsTab: string) => void;
}

function UserSideBar({
  tabs,
  activeTab,
  setActiveTab,
  activeSettingsTab,
  setActiveSettingsTab,
}: SidebarProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleSettingsTabClick = (settingsTab: string) => {
    setActiveTab("tabSettings");
    setActiveSettingsTab(settingsTab);
  };

  const handleSidebarClick = (id: string) => {
    setActiveTab(id);
    setIsSettingsOpen(false);
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
                      setActiveSettingsTab("profile");
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
                  onClick={() => handleSidebarClick(tab.id)}
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
