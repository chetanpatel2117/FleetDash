import dotenv from "dotenv";
import http from "http";
import { startGeofenceSubscriber } from "./services/geofenceSubscriber.service";
import { connectPublisher } from "./services/geofencePublisher.service";
import app from "./app";
import { connectDatabase } from "./database/database";
import { seedAdmin } from "./scripts/seedAdmin";
import { initializeSocket } from "./socket/socket";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    try {
      await connectDatabase();

      // Ensure an admin user exists (created from env ADMIN_USER/ADMIN_PASS)
      await seedAdmin();
    } catch (databaseError) {
      console.warn("Database unavailable; continuing with fallback authentication.", databaseError);
    }

    try {
      await connectPublisher();
    } catch (error) {
      console.warn("Warning: Redis publisher unavailable, continuing without publisher.", error);
    }

    const server = http.createServer(app);

    initializeSocket(server);

    try {
      await startGeofenceSubscriber();
    } catch (error) {
      console.warn("Warning: Geofence subscriber failed to start, continuing without subscriber.", error);
    }

    server.listen(PORT, () => {
      console.log(`🚀 FleetDash Backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();