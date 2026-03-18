import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../constant/statusCode.interface";
import { Message } from "../constant/message.interface";
import type { UserPayload } from "../dto/interface";

type AllowedRole = "admin";

export const requireAdminOrSuperAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const user = (req as Request & { user?: UserPayload }).user;

  if (!user) {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: Message.UNAUTHORIZED });
    return;
  }

  const role = user.role;
  if (role !== "admin") {
    res.status(HTTP_STATUS.FORBIDDEN).json({ message: Message.FORBIDDEN_ROLE });
    return;
  }

  next();
};

export const requireRole = (roles: AllowedRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as Request & { user?: UserPayload }).user;

    if (!user) {
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: Message.UNAUTHORIZED });
      return;
    }

    if (!roles.includes(user.role as AllowedRole)) {
      res
        .status(HTTP_STATUS.FORBIDDEN)
        .json({ message: Message.FORBIDDEN_ROLE });
      return;
    }

    next();
  };
};
