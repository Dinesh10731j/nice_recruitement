import type { NextFunction, Request, Response } from "express";
import { ActivityService } from "../service/activity/activity.service";
import { AppDataSource } from "../configs/psqllDB.config";
import type { UserPayload } from "../dto/interface";

const activityService = new ActivityService();

const getClientIp = (req: Request): string | null => {
  const header =
    (req.headers["x-forwarded-for"] as string | undefined) ||
    (req.headers["x-real-ip"] as string | undefined);
  if (header) return header.split(",")[0]?.trim() || null;
  return req.socket.remoteAddress || null;
};

export const autoUserTracking = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (
    process.env.NODE_ENV === "test" ||
    process.env.SKIP_ACTIVITY === "true" ||
    !AppDataSource.isInitialized
  ) {
    next();
    return;
  }
  const startedAt = Date.now();

  res.on("finish", () => {
    const durationMs = Date.now() - startedAt;
    const user = (req as Request & { user?: UserPayload }).user;

    const payload = {
      userId: user?.id ?? null,
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      ip: getClientIp(req),
      userAgent: req.headers["user-agent"] || null,
      referer: req.headers["referer"] || null,
      durationMs,
    };

    activityService.log(payload).catch((err) => {
      if (process.env.NODE_ENV !== "test") {
        console.error("Activity log failed", err);
      }
    });
  });

  next();
};
