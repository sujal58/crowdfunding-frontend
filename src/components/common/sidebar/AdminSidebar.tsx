import React, { useState } from "react";
import "./UserSidebar.css";
import { useNavigate } from "react-router-dom";

interface Tab {
  id: string;
  label: string;
  path: string;
  submenu?: Tab[];
}

interface AdminSidebarProps {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (id: string) => void;
  activeSubmenu: string;
  setActiveSubmenu: (id: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  tabs,
  activeTab,
  setActiveTab,
  activeSubmenu,
  setActiveSubmenu,
}) => {
  const navigate = useNavigate();
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isFundOpen, setIsFundOpen] = useState(false);
  const [isCampaignOpen, setIsCampaignOpen] = useState(false);

  // useEffect(() => {
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     const buttons = document.querySelectorAll(
  //       'nav[aria-label="Dashboard Navigation"] button, nav[aria-label="Dashboard Navigation"] a'
  //     );
  //     const current = Array.from(buttons).findIndex(
  //       (btn) =>
  //         btn.getAttribute("aria-selected") === "true" ||
  //         btn.getAttribute("aria-current") === "page"
  //     );
  //     let nextIndex = current;

  //     if (e.key === "ArrowDown") nextIndex = (current + 1) % buttons.length;
  //     else if (e.key === "ArrowUp")
  //       nextIndex = (current - 1 + buttons.length) % buttons.length;
  //     else if (e.key === "Enter" || e.key === " ") {
  //       const target = e.target as HTMLElement;
  //       setActiveTab(
  //         target.id || (target.closest("a") as HTMLAnchorElement)?.id
  //       );
  //       return;
  //     }

  //     if (nextIndex !== current) {
  //       const nextButton = buttons[nextIndex] as HTMLElement;
  //       nextButton.focus();
  //       setActiveTab(
  //         nextButton.id || (nextButton.closest("a") as HTMLAnchorElement)?.id
  //       );
  //     }
  //   };

  //   document.addEventListener("keydown", handleKeyDown);
  //   return () => document.removeEventListener("keydown", handleKeyDown);
  // }, [activeTab, setActiveTab]);

  const toggleSubmenu = (tab: Tab) => {
    console.log(tab);
    setActiveTab(tab.id);
    const submenu = tab.id.replace("tab", "").toLowerCase();
    console.log(submenu);
    switch (submenu) {
      case "user":
        setIsUserOpen(!isUserOpen);
        setIsFundOpen(false);
        setIsCampaignOpen(false);

        break;
      case "fund":
        setIsFundOpen(!isFundOpen);
        setIsUserOpen(false);
        setIsCampaignOpen(false);

        break;
      case "campaign":
        setIsCampaignOpen(!isCampaignOpen);
        setIsUserOpen(false);
        setIsFundOpen(false);

        break;
    }
  };

  return (
    <aside className="sidebar admin-sidebar">
      <nav aria-label="Dashboard Navigation">
        <ul>
          {tabs.map((tab) => (
            <li key={tab.id}>
              {tab.submenu ? (
                <>
                  <button
                    type="button"
                    className={`tabButton ${
                      activeTab == tab.id ? "active" : " "
                    }`}
                    onClick={() => toggleSubmenu(tab)}
                    aria-selected={activeTab == tab.id}
                    aria-expanded={
                      tab.id === "tabUser"
                        ? isUserOpen
                        : tab.id === "tabFund"
                        ? isFundOpen
                        : isCampaignOpen
                    }
                    aria-label="Dashboard Navigation"
                    aria-controls={`${tab.id}-submenu`}
                  >
                    {tab.label}
                  </button>
                  <ul
                    id={`${tab.id}-submenu`}
                    aria-label="Dashboard Navigation"
                    className={`submenu ${
                      tab.id === "tabUser"
                        ? isUserOpen
                          ? "open"
                          : "close"
                        : tab.id === "tabFund"
                        ? isFundOpen
                          ? "open"
                          : "close"
                        : isCampaignOpen
                        ? "open"
                        : "close"
                    }`}
                  >
                    {tab.submenu.map((subTab) => (
                      <li key={subTab.id}>
                        <button
                          type="button"
                          id={subTab.id}
                          aria-current={
                            activeTab === subTab.id ? "page" : undefined
                          }
                          tabIndex={activeTab === subTab.id ? 0 : -1}
                          onClick={() => {
                            setActiveSubmenu(subTab.id);
                            navigate(
                              `/admin-dashboard${tab.path}${subTab.path}`
                            );
                          }}
                          className={
                            activeSubmenu === subTab.id ? "active" : ""
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
                  id={tab.id}
                  aria-current={activeTab === tab.id ? "page" : undefined}
                  aria-selected={activeTab === tab.path && true}
                  tabIndex={activeTab === tab.id ? 0 : -1}
                  onClick={() => {
                    setActiveTab(tab.id);
                    navigate("/admin-dashboard".concat(tab.path));
                  }}
                  className={activeTab === tab.id ? "active" : ""}
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
};

export default AdminSidebar;
