import express, { Application, Request, Response } from "express";
import router from "../routes/index.routes";
import cookieParser from "cookie-parser"
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import { apiRateLimiter } from "../middleware/rate_limiting";
import { autoUserTracking } from "../middleware/auto_user_tracking";
import { HTTP_STATUS } from "../constant/statusCode.interface";
import { Message } from "../constant/message.interface";
import { httpLogger } from "../utils/logger";
const createApp = (): Application => {
  const app = express();
  // Middlewares
  app.use(cookieParser())
  app.use(morgan("dev"));
  app.use(httpLogger);

  const allowedOrigins = (process.env.CORS_ORIGINS || "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);

  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.length === 0) {
        const allowAllInDev = process.env.NODE_ENV !== "production";
        return callback(null, allowAllInDev);
      }
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS blocked"), false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "X-Captcha-Token"],
    exposedHeaders: ["Set-Cookie"],
    maxAge: 600,
  };

  app.use(cors(corsOptions));
  app.use(apiRateLimiter);
  app.use(autoUserTracking);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/health", (_req: Request, res: Response) =>
    res.status(HTTP_STATUS.OK).json({ status: Message.HEALTH_OK })
  );

  app.use("/api/v1/nice_recuirement", router);

  return app;
};

export default createApp;
