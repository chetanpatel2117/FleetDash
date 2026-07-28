import { createClient } from "redis";
import { GeofenceAlert } from "../interfaces/alert.interface";

export const publisher = createClient({
  socket: {
    reconnectStrategy: false,
  },
});

publisher.on("error", (err) => {
  console.error("Redis Publisher Error:", err);
});

export const connectPublisher = async (): Promise<void> => {
  if (!publisher.isOpen) {
    try {
      await publisher.connect();
      console.log("✅ Redis Publisher Connected");
    } catch (error) {
      console.warn("Warning: Redis publisher failed to connect", error);
    }
  }
};

export const publishGeofenceAlert = async (
  alert: GeofenceAlert
): Promise<void> => {
  await publisher.publish(alert.event, JSON.stringify(alert));
};

