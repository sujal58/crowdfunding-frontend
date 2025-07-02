import "./Setting.css";
import { Outlet } from "react-router-dom";

function Settings() {
  return (
    <section className="settings-container">
      <div className="settings-content">
        <Outlet />
      </div>
    </section>
  );
}

export default Settings;
