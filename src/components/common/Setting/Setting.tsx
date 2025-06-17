import Profile from "./Profile.jsx";
import Security from "./Security.tsx";
import KYCForm from "../KycForm/KycForm.tsx";
import "./Setting.css";

function Settings({ activeSettingsTab }: any) {
  const renderContent = () => {
    switch (activeSettingsTab) {
      case "profile":
        return <Profile />;
      case "security":
        return <Security />;
      case "kyc":
        return <KYCForm />;
      default:
        return <Profile />;
    }
  };

  return (
    <section className="settings-container">
      <div className="settings-content">{renderContent()}</div>
    </section>
  );
}

export default Settings;
