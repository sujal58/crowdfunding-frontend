import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const socketUrl = "http://localhost:8080/ws";

const saved = localStorage.getItem("userdata");
let token;
if (saved) {
  token = JSON.parse(saved).token;
}
console.log(token);

const stompClient = new Client({
  webSocketFactory: () => new SockJS(socketUrl),
  reconnectDelay: 5000,
  connectHeaders: {
    Authorization: `Bearer ${token}`,
  },
  // debug: (str) => console.log("[STOMP]", str),
  onConnect: () => console.log("STOMP connected"),
  onStompError: (frame) => console.error("STOMP error", frame),
});

export default stompClient;
