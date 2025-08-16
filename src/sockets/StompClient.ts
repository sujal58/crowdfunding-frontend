// socket.js
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient: Client;

export const connectStomp = (token:string) => {
  const tokenParam = `?token=${encodeURIComponent(token)}`;
  const socketUrl = `http://localhost:8080/ws${tokenParam}`;

  stompClient = new Client({
    webSocketFactory: () => new SockJS(socketUrl),
    reconnectDelay: 5000,
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    onConnect: () => {
      console.log("STOMP connected");
    },
    onStompError: (frame) => {
      console.error("STOMP error", frame);
    },
  });

  stompClient.activate();
  return stompClient;
};

export const getStompClient = () => stompClient;
