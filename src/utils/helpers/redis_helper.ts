import { redisService } from "../../configs/redis.config";

export const getCache = async <T>(key: string): Promise<{ cached: boolean; data: T | null }> => {
  try {
    const raw = await redisService.get(key);
    if (!raw) return { cached: false, data: null };
    return { cached: true, data: JSON.parse(raw) as T };
  } catch {
    return { cached: false, data: null };
  }
};

export const setCache = async (key: string, value: unknown, ttlSeconds?: number): Promise<void> => {
  try {
    await redisService.set(key, JSON.stringify(value), ttlSeconds);
  } catch {
    // ignore cache failures
  }
};

export const delCache = async (key: string): Promise<void> => {
  try {
    await redisService.del(key);
  } catch {
    // ignore cache failures
  }
};
