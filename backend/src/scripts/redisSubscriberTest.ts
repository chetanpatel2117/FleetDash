import { redisClient } from "../config/redis";

const subscriber = redisClient.duplicate();

subscriber.on("error", (error) => {
  console.error("🔴 Redis Subscriber Error:", error);
});

async function startSubscriber(): Promise<void> {
  await subscriber.connect();

  console.log("🟢 Redis test subscriber connected");

  await subscriber.subscribe(
    ["vehicle:update", "vehicle:alert"],
    (message, channel) => {
      try {
        const parsedMessage = JSON.parse(message);

        console.log(`\n📥 Received from ${channel}:`);
        console.log(parsedMessage);
      } catch {
        console.log(`\n📥 Received from ${channel}:`);
        console.log(message);
      }
    },
  );

  console.log("👂 Listening on vehicle:update and vehicle:alert");
}

async function shutdown(): Promise<void> {
  console.log("\nClosing Redis subscriber...");

  if (subscriber.isOpen) {
    await subscriber.quit();
  }

  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

startSubscriber().catch((error) => {
  console.error("Failed to start Redis subscriber:", error);
  process.exit(1);
});
