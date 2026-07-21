import { redisClient, connectRedis } from "../config/redis";

export async function publishVehicleUpdate(data: unknown): Promise<void> {
  await connectRedis();

  await redisClient.publish("vehicle:update", JSON.stringify(data));

  console.log("📡 Published to vehicle:update");
}

export async function publishVehicleAlert(data: unknown): Promise<void> {
  await connectRedis();

  await redisClient.publish("vehicle:alert", JSON.stringify(data));

  console.log("🚨 Published to vehicle:alert");
}
