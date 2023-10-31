import io from "socket.io-client";
export let webSocket;
if (process.env.NODE_ENV === "development") {
  // Code to run in development environment
  webSocket = io("http://localhost:5000");
} else {
  // webSocket = io(process.env.SOCKET_URL);
  webSocket = io("https://socket.ceyinfo.cloud");

  // Code to run in production environmentds
}
