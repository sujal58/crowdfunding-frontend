import { getNotificationByUser } from "@/apis/notification.api";
import type { INotificationResponse } from "@/interfaces/notification.interface";
import type { GetResponse } from "@/types";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const NotificationPanel: React.FC = () => {
  const [notifications, setnotifications] = useState<INotificationResponse[]>(
    []
  );

  // const notification = [
  //   {
  //     id: 1,
  //     message:
  //       "New campaign <strong>Clean Water for All</strong> submitted for approval.",
  //     unread: true,
  //   },
  //   {
  //     id: 2,
  //     message: "User <strong>Jane Smith</strong> submitted KYC documents.",
  //     unread: false,
  //   },
  //   {
  //     id: 3,
  //     message:
  //       "Payment of <strong>$2,000</strong> released to <strong>Jane Smith</strong>.",
  //     unread: false,
  //   },
  // ];

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const response: AxiosResponse<GetResponse<INotificationResponse>> =
          await getNotificationByUser();
        console.log(response);
        if (response.status == 200) {
          setnotifications(response.data.data);
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const message =
            err.response?.data?.data || "Error while fetching donation.";
          toast.error(message);
        } else {
          toast.error("Something went wrong. Please try again.", {
            style: { background: "#fef2f2", color: "#ef4444" },
          });
        }
      }
    };

    fetchDonation();
  }, []);

  const handleMarkRead = (id: number) => {
    console.log(`Marked notification ${id} as read`);
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Notifications</h2>
      {notifications.map((notif) => (
        <div
          key={notif.notificationId}
          className={`p-4 rounded-xl mb-4 flex justify-between items-center ${
            !notif.read ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
          tabIndex={0}
          aria-live="assertive"
        >
          <div dangerouslySetInnerHTML={{ __html: notif.message }} />
          <button
            onClick={() => handleMarkRead(notif.notificationId)}
            className="text-inherit font-bold hover:underline"
          >
            Mark as read
          </button>
        </div>
      ))}
    </>
  );
};

export default NotificationPanel;
