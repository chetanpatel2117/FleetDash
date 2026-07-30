import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { registerSocketHandlers } from "./socketHandlers";

let io: Server | null = null;

export const initializeSocket = (httpServer: HttpServer): Server => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || "*",
      methods: ["GET", "POST"],
    },
  });

  registerSocketHandlers(io);

  console.log("✅ Socket.io initialized");

  return io;
};

export const getIO = (): Server => {
  if (!io) {
    throw new Error("Socket.io has not been initialized.");
  }

  return io;
};