import { useEffect } from "react";
import { toast } from "react-toastify";
import stompClient from "../sockets/StompClient";

const useNotification = (username: string) => {
  useEffect(() => {
    const onConnect = () => {
      console.log("STOMP connected");

      const broadcastSub = stompClient.subscribe(
        "/broadcast/notifications",
        (message) => {
          const data = JSON.parse(message.body);
          toast.info(`🔔 ${data.message}`, {
            position: "bottom-right",
            autoClose: 10000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      );

      const privateSub = stompClient.subscribe(
        `/user/${username}/queue/notifications`,
        (message) => {
          const data = JSON.parse(message.body);
          toast.info(`🧍 ${data.message}`, {
            position: "bottom-right",
            autoClose: 10000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      );

      // Return cleanup function to unsubscribe on unmount or dependency change
      return () => {
        broadcastSub.unsubscribe();
        privateSub.unsubscribe();
      };
    };

    stompClient.onConnect = onConnect;

    if (!stompClient.active) {
      stompClient.activate();
    }

    // Cleanup function for useEffect (in case connection disconnects or component unmounts)
    return () => {
      if (stompClient.connected) {
        // Note: This won't unsubscribe those subscriptions created inside onConnect
        // So keep cleanup inside onConnect return or add a state to track subs
        stompClient.deactivate();
      }
    };
  }, [username]);
};

export default useNotification;
