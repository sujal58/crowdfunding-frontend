import { useState, type ReactNode } from "react";
import "./CampaignTabs.css";

type CampaignTabsProps = {
  tabs: {
    id: string;
    label: string;
    content: ReactNode;
  }[];
};

function CampaignTabs({ tabs }: CampaignTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <section className="tabs" aria-label="Campaign tabs">
      <div role="tablist" className="tab-list" aria-orientation="horizontal">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={tab.id}
            id={`tab${tab.id}`}
            className="tab"
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`tab-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab${tab.id}`}
          className="tab-panel"
          hidden={activeTab !== tab.id}
        >
          {tab.content}
        </div>
      ))}
    </section>
  );
}

export default CampaignTabs;
