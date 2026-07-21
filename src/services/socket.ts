import { io, type Socket } from "socket.io-client"
import type { VehicleTelemetry } from "../types/vehicle"

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000"

export interface ServerToClientEvents {
  telemetry: (payload: VehicleTelemetry) => void
  connect: () => void
  disconnect: (reason: string) => void
}

export interface ClientToServerEvents {
  subscribe?: () => void
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  SOCKET_URL,
  {
    autoConnect: false,
    transports: ["websocket", "polling"],
  },
)

export const connectSocket = (): Socket<ServerToClientEvents, ClientToServerEvents> => {
  if (!socket.connected && !socket.connecting) {
    socket.connect()
  }
  return socket
}

export const disconnectSocket = (): void => {
  if (socket.connected || socket.connecting) {
    socket.disconnect()
  }
}
