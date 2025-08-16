import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { Client, type StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { NotificationType } from "@/enums";

interface UseNotificationProps {
  username: string;
  token: string;
  socketUrl?: string; // optional custom URL
}

const useNotification = ({
  username,
  token,
  socketUrl = "http://localhost:8080/ws",
}: UseNotificationProps) => {
  const clientRef = useRef<Client | null>(null);
  const broadcastSubRef = useRef<StompSubscription | null>(null);
  const privateSubRef = useRef<StompSubscription | null>(null);

  useEffect(() => {
    if (!username || !token) return; // wait until user is logged in

    const fullUrl = `${socketUrl}?token=${encodeURIComponent(token)}`;

    const client = new Client({
      webSocketFactory: () => new SockJS(fullUrl),
      reconnectDelay: 5000,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },

      onConnect: () => {
        console.log("✅ STOMP connected");

        // Subscribe to broadcast messages
        broadcastSubRef.current = client.subscribe(
          "/broadcast/notifications",
          (message) => {
            const data = JSON.parse(message.body);
            console.log("Message broadcasted: ", data);
            toast.info(`🔔 ${data.message}`, {
              position: "bottom-right",
              autoClose: 10000,
              hideProgressBar: true,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
            });
          }
        );

        // Subscribe to private messages
        privateSubRef.current = client.subscribe(
          `/user/queue/notifications`,
          (message) => {
            const data = JSON.parse(message.body);
            toast.info(
              `${(data.notificationType = NotificationType.DONATION
                ? "💵"
                : "")} ${data.message}`,
              {
                position: "bottom-right",
                autoClose: 10000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
              }
            );
          }
        );
      },
      onStompError: (frame) => {
        console.error("❌ STOMP error", frame);
      },
    });

    client.activate();

    clientRef.current = client;

    return () => {
      if (broadcastSubRef.current) broadcastSubRef.current.unsubscribe();
      if (privateSubRef.current) privateSubRef.current.unsubscribe();
      if (clientRef.current) {
        clientRef.current.deactivate();
        clientRef.current = null;
      }
    };
  }, [username, token, socketUrl]);
};

export default useNotification;
