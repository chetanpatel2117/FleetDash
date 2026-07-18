import type { Server as HttpServer } from "http"
import { Server as SocketIOServer } from "socket.io"

export let io: SocketIOServer | null = null

export const initSocketServer = (httpServer: HttpServer) => {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: true,
      methods: ["GET", "POST"],
    },
  })

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`)

    socket.on("disconnect", (reason) => {
      console.log(`Socket disconnected: ${socket.id} (${reason})`)
    })
  })

  return io
}
