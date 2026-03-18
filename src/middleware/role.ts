import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../constant/statusCode.interface";
import { Message } from "../constant/message.interface";
import type { UserPayload } from "../dto/interface";





export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as Request & { user?: UserPayload }).user;

  if (!user) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: Message.ACCESS_TOKEN_MISSING });
  }

  if (user.role !== "admin") {
    return res.status(HTTP_STATUS.FORBIDDEN).json({ message: "You do not have permission to access this resource." });
  }

  next();
};
