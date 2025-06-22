import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
// import "./Settings.css";

function Security() {
  const [twofaEnabled, setTwofaEnabled] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Changing password:", data);
    toast.success("Password changed successfully!", {
      style: { background: "#f0fdf4", color: "#22c55e" },
    });
    reset();
  };

  const handleTwofaToggle = (e: any) => {
    setTwofaEnabled(e.target.checked);
    console.log("2FA toggled:", e.target.checked);
    toast.success(`2FA ${e.target.checked ? "enabled" : "disabled"}!`, {
      style: { background: "#f0fdf4", color: "#22c55e" },
    });
  };

  const handleDelete = () => {
    if (
      window.confirm(
        "Are you sure you want to permanently delete your account?"
      )
    ) {
      console.log("Deleting account");
      toast.error("Account deletion requested!", {
        style: { background: "#fef2f2", color: "#ef4444" },
      });
    }
  };

  return (
    <>
      <div className="settings-section">
        <h3>Change Password</h3>
        <form className="password-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              id="currentPassword"
              type="password"
              {...register("currentPassword", {
                required: "Current password is required",
              })}
              aria-label="Current Password"
            />
            {typeof errors.currentPassword?.message === "string" && (
              <span className="error">{errors.currentPassword.message}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              id="newPassword"
              type="password"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "New password must be at least 8 characters",
                },
              })}
              aria-label="New Password"
            />
            {typeof errors.newPassword?.message === "string" && (
              <span className="error">{errors.newPassword.message}</span>
            )}
          </div>
          <button
            type="submit"
            className="submit-btn"
            aria-label="Change Password"
          >
            Change Password
          </button>
        </form>
      </div>
      <div className="settings-section">
        <h3>Two-Factor Authentication (2FA)</h3>
        <div className="twofa-section">
          <div className="twofa-toggle">
            <input
              type="checkbox"
              id="twofaToggle"
              checked={twofaEnabled}
              onChange={handleTwofaToggle}
              aria-label="Toggle 2FA"
            />
            <label htmlFor="twofaToggle">Enable 2FA</label>
          </div>
          {/* {twofaEnabled && (
            <div className="twofa-qr">
              <p>Scan this QR code with your authenticator app</p>
            </div>
          )} */}
        </div>
      </div>
      <div className="settings-section">
        <h3>Delete Account</h3>
        <div className="delete-account-section">
          <p>Permanently delete your account and all associated data.</p>
          <button
            className="delete-btn"
            onClick={handleDelete}
            aria-label="Delete Account"
          >
            Delete Account
          </button>
        </div>
      </div>
    </>
  );
}

export default Security;
