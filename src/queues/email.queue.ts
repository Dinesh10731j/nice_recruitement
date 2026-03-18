import { Queue, type ConnectionOptions } from "bullmq";
import { envConfig } from "../configs/env.config";

if (!envConfig.REDIS_URL) {
  throw new Error("REDIS_URL is not defined in your environment variables!");
}

const toConnectionOptions = (redisUrl: string): ConnectionOptions => {
  const url = new URL(redisUrl);
  const db =
    url.pathname && url.pathname.length > 1 ? Number(url.pathname.slice(1)) : undefined;
  const isTls = url.protocol === "rediss:";

  return {
    host: url.hostname,
    port: Number(url.port) || 6379,
    username: url.username || undefined,
    password: url.password || undefined,
    db: Number.isFinite(db) ? db : undefined,
    tls: isTls ? {} : undefined,
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  };
};

const connection = toConnectionOptions(envConfig.REDIS_URL);

export const emailQueue = new Queue("email", { connection });
