import { createClient } from "redis";
import { io } from "../socket";

const subscriber = createClient();

subscriber.on("error", (err) => {
  console.error("Redis Subscriber Error:", err);
});

export const startGeofenceSubscriber = async (): Promise<void> => {
  if (!subscriber.isOpen) {
    await subscriber.connect();
  }

  await subscriber.subscribe("geofence:entry", (message) => {
    const alert = JSON.parse(message);

    console.log("Geofence Entry:", alert);

    io?.emit("geofence:entry", alert);
  });

  await subscriber.subscribe("geofence:breach", (message) => {
    const alert = JSON.parse(message);

    console.log("Geofence Breach:", alert);

    io?.emit("geofence:breach", alert);
  });
};