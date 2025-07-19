import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import useAuth from "@/Context/AuthContext";
import { MdVerifiedUser } from "react-icons/md";
import { useEffect, useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

function AuthHeader() {
  let navigate = useNavigate();
  let location = useLocation();
  const { logout, username, status } = useAuth();
  const [isVerified, setIsVerified] = useState(
    status === "VERIFIED" ? true : false
  );

  useEffect(() => {
    setIsVerified(status === "VERIFIED" ? true : false);
  }, [status]);

  const navigateLink = location.pathname.includes("/user-dashboard")
    ? "/user-dashboard"
    : "/admin-dashboard";

  return (
    <>
      {/* <h1 className="top-header">
        {navigateLink == "/user-dashboard"
          ? "USER DASHBOARD"
          : "ADMIN DASHBOARD"}
      </h1> */}
      <header className="header">
        <h1 className="header-logo" onClick={() => navigate(navigateLink)}>
          {/* fundSaathi */}
          <img
            src="/longlogo.png"
            alt="Logo of fundSaathi"
            height={200}
            width={200}
          />
        </h1>
        <label>
          Welcome, {username} {status === "VERIFIED" && <MdVerifiedUser />}
        </label>
        <nav className="auth-btn">
          {navigateLink === "/user-dashboard" && (
            <button
              className="btn-login"
              disabled={!isVerified}
              data-tooltip-content={
                isVerified
                  ? ""
                  : "Verify your kyc to create your first Campaign!"
              }
              data-tooltip-id="myTooltip"
              onClick={() => navigate(`${navigateLink}/create-campaign`)}
            >
              Create Campaign
            </button>
          )}
          <ReactTooltip id="myTooltip" />
          <button className="btn-register" onClick={() => logout()}>
            Log Out
          </button>
        </nav>
      </header>
    </>
  );
}

export default AuthHeader;
