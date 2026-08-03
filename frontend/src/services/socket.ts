import { io, Socket } from "socket.io-client";

const socketUrl = import.meta.env.VITE_SOCKET_URL;
const useOriginSocketFallback = import.meta.env.PROD && socketUrl?.includes("localhost");
const SOCKET_URL = useOriginSocketFallback ? window.location.origin : socketUrl || window.location.origin;

export const socket: Socket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
});

export default socket;