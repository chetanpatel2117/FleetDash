import { createClient } from "redis";

const subscriber = createClient();

subscriber.on("error", (error) => {
  console.error("❌ Redis Subscriber Error:", error);
});

subscriber.on("connect", () => {
  console.log("✅ Redis Subscriber Connected");
});

export default subscriber;