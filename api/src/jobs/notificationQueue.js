import { Queue } from "bullmq";
import Redis from "ioredis";

export const connection = new Redis(process.env.REDIS_URL, { maxRetriesPerRequest: null, tls: {} });
export const notificationQueue = new Queue("notifications", { connection });
