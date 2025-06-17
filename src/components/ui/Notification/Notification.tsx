import { toast } from "react-toastify";
import "./Notification.css";

function Notifications() {
  const notifications = [
    {
      message:
        "Your campaign <strong>Clean Water for All</strong> received a new donation of <strong>$100</strong>!",
      unread: true,
    },
    {
      message: "KYC verification for your account is <strong>Pending</strong>.",
      unread: false,
    },
  ];

  const handleMarkAsRead = (message: any) => {
    console.log("Marking notification as read");
    toast.success("Marked as read", {
      style: { background: "#f0fdf4", color: "#22c55e" },
    });
  };

  return (
    <section aria-labelledby="notificationsHeading">
      <h2 id="notificationsHeading">Notifications</h2>
      {notifications.map((notification, index) => (
        <div
          key={index}
          className={`notification ${notification.unread ? "unread" : ""}`}
          tabIndex={0}
          aria-live={notification.unread ? "assertive" : "polite"}
        >
          <div dangerouslySetInnerHTML={{ __html: notification.message }} />
          <button
            onClick={() => handleMarkAsRead(notification.message)}
            aria-label="Mark notification as read"
          >
            Mark as read
          </button>
        </div>
      ))}
    </section>
  );
}

export default Notifications;
