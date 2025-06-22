// import React, { useEffect } from "react";
// import "./UserSidebar.css";

// interface Tab {
//   id: string;
//   label: string;
//   panelId: string;
// }

// interface AdminSidebarProps {
//   tabs: Tab[];
//   activeTab: string;
//   setActiveTab: (id: string) => void;
// }

// const AdminSidebar: React.FC<AdminSidebarProps> = ({
//   tabs,
//   activeTab,
//   setActiveTab,
// }) => {
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       const buttons = document.querySelectorAll(
//         'nav[aria-label="Admin Navigation"] button'
//       );
//       const current = Array.from(buttons).findIndex(
//         (btn) => btn.getAttribute("aria-selected") === "true"
//       );
//       let nextIndex = current;

//       if (e.key === "ArrowDown") nextIndex = (current + 1) % buttons.length;
//       else if (e.key === "ArrowUp")
//         nextIndex = (current - 1 + buttons.length) % buttons.length;
//       else if (e.key === "Enter" || e.key === " ") {
//         setActiveTab((e.target as HTMLButtonElement).id);
//         return;
//       }

//       if (nextIndex !== current) {
//         const nextButton = buttons[nextIndex] as HTMLElement;
//         nextButton.focus();
//         setActiveTab(buttons[nextIndex].id);
//       }
//     };

//     document.addEventListener("keydown", handleKeyDown);
//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, [activeTab, setActiveTab]);

//   return (
//     <aside className="w-96 bg-gray-200 px-8 py-6 border-r border-gray-300 overflow-y-auto">
//       <nav aria-label="Admin Navigation">
//         <ul role="list" className="space-y-4">
//           {tabs.map((tab) => (
//             <li key={tab.id} className="p-12 text-red-500">
//               <button
//                 role="tab"
//                 id={tab.id}
//                 aria-selected={activeTab === tab.id ? "true" : "false"}
//                 tabIndex={activeTab === tab.id ? 0 : -1}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`w-full bg-transparent text-gray-700 font-semibold px-3 py-4 rounded-lg text-left text-sm ${
//                   activeTab === tab.id
//                     ? "bg-blue-700 text-white"
//                     : "hover:bg-blue-100 focus:bg-blue-100"
//                 }`}
//               >
//                 {tab.label}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </aside>
//   );
// };

// export default AdminSidebar;

import React, { useEffect, type ReactElement } from "react";
// import "./UserSideBar.css";

interface Tab {
  id: string;
  label: string;
  panel: ReactElement;
}

interface AdminSidebarProps {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  tabs,
  activeTab,
  setActiveTab,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const buttons = document.querySelectorAll(
        'nav[aria-label="Admin Navigation"] button'
      );
      const current = Array.from(buttons).findIndex(
        (btn) => btn.getAttribute("aria-selected") === "true"
      );
      let nextIndex = current;

      if (e.key === "ArrowDown") nextIndex = (current + 1) % buttons.length;
      else if (e.key === "ArrowUp")
        nextIndex = (current - 1 + buttons.length) % buttons.length;
      else if (e.key === "Enter" || e.key === " ") {
        setActiveTab((e.target as HTMLButtonElement).id);
        return;
      }

      if (nextIndex !== current) {
        const nextButton = buttons[nextIndex] as HTMLElement;
        nextButton.focus();
        setActiveTab(buttons[nextIndex].id);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeTab, setActiveTab]);

  return (
    <aside className="sidebar">
      <nav aria-label="Dashboard Navigation">
        <ul>
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                role="tab"
                id={tab.id}
                aria-selected={activeTab === tab.id}
                tabIndex={activeTab === tab.id ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                className={activeTab === tab.id ? "active" : ""}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
