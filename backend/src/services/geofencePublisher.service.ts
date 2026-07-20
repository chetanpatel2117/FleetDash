import { createClient } from "redis";
import { GeofenceAlert } from "../interfaces/alert.interface";

const publisher = createClient();

publisher.on("error", (err) => {
  console.error("Redis Publisher Error:", err);
});

(async () => {
  if (!publisher.isOpen) {
    await publisher.connect();
  }
})();

export const publishGeofenceAlert = async (
  alert: GeofenceAlert
): Promise<void> => {
  await publisher.publish(alert.event, JSON.stringify(alert));
};