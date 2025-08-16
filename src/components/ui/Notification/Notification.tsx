import { toast } from "react-toastify";
import "./Notification.css";
import { useEffect, useState } from "react";
import type { INotificationResponse } from "@/interfaces/notification.interface";
import type { AxiosResponse } from "axios";
import type { GetResponse } from "@/types";
import {
  changeNotificationStatus,
  getNotificationByUser,
} from "@/apis/notification.api";
import axios from "axios";

function Notifications() {
  const [notifications, setnotifications] = useState<INotificationResponse[]>(
    []
  );
  // const notification = [
  //   {
  //     message:
  //       "Your campaign <strong>Clean Water for All</strong> received a new donation of <strong>$100</strong>!",
  //     unread: true,
  //   },
  //   {
  //     message: "KYC verification for your account is <strong>Pending</strong>.",
  //     unread: false,
  //   },
  // ];

  const handleMarkAsRead = async (notificationId: number, status: boolean) => {
    try {
      const response: AxiosResponse<GetResponse<INotificationResponse>> =
        await changeNotificationStatus(notificationId, status);
      if (response.status == 200) {
        console.log(response);
        toast.success(response.data.message);
        fetchNotification();
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.data ||
          "Error while changing notification status.";
        toast.error(message);
      } else {
        toast.error("Something went wrong. Please try again.", {
          style: { background: "#fef2f2", color: "#ef4444" },
        });
      }
    }
  };

  const fetchNotification = async () => {
    try {
      const response: AxiosResponse<GetResponse<INotificationResponse>> =
        await getNotificationByUser();
      if (response.status == 200) {
        setnotifications(response.data.data);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.data || "Error while fetching notification.";
        toast.error(message);
      } else {
        toast.error("Something went wrong. Please try again.", {
          style: { background: "#fef2f2", color: "#ef4444" },
        });
      }
    }
  };

  useEffect(() => {
    fetchNotification();
  }, []);

  return (
    <section aria-labelledby="notificationsHeading">
      <h2 id="notificationsHeading">Notifications</h2>
      {notifications.map((notification, index) => (
        <div
          key={index}
          className={`notification ${!notification.read ? "unread" : ""}`}
          tabIndex={0}
          aria-live={!notification.read ? "assertive" : "polite"}
        >
          <div dangerouslySetInnerHTML={{ __html: notification.message }} />
          <button
            onClick={() =>
              handleMarkAsRead(notification.notificationId, notification.read)
            }
            aria-label="Mark notification as read"
          >
            {notification.read ? "Mark as unread" : "Mark as read"}
          </button>
        </div>
      ))}
    </section>
  );
}

export default Notifications;
