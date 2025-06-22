import "./Setting.css";
import { Outlet } from "react-router-dom";

// { activeSettingsTab }: any
function Settings() {
  // const renderContent = () => {
  //   switch (activeSettingsTab) {
  //     case "profile":
  //       return <Profile />;
  //     case "security":
  //       return <Security />;
  //     case "kyc":
  //       return <KYCForm />;
  //     default:
  //       return <Profile />;
  //   }
  // };

  return (
    <section className="settings-container">
      {/* {renderContent()} */}
      <div className="settings-content">
        <Outlet />
      </div>
    </section>
  );
}

export default Settings;
