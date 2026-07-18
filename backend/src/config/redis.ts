import { createClient } from "redis";

export const redisClient = createClient({
  url: "redis://127.0.0.1:6379",
});

redisClient.on("connect", () => {
  console.log("🟢 Redis Connected");
});

redisClient.on("error", (err) => {
  console.error("🔴 Redis Error:", err);
});

export async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
}
