import dotenv from "dotenv";
import { createServer } from "http";

import app from "./app";
import { initializeSocket } from "./socket/socket";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Create HTTP server
const httpServer = createServer(app);

// Attach Socket.io
initializeSocket(httpServer);

// Start server
httpServer.listen(PORT, () => {
  console.log(`🚀 FleetDash Backend running on port ${PORT}`);
});