import dotenv from "dotenv";
import http from "http";
import { startGeofenceSubscriber } from "./services/geofenceSubscriber.service";
import app from "./app";
import { connectDatabase } from "./database/database";
import { initializeSocket } from "./socket/socket";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDatabase();

    const server = http.createServer(app);

    initializeSocket(server);
    await startGeofenceSubscriber();

    server.listen(PORT, () => {
      console.log(`🚀 FleetDash Backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();