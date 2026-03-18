import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserPayload } from "../dto/interface";
import { envConfig } from "../configs/env.config";
import { HTTP_STATUS } from "../constant/statusCode.interface";
import { Message } from "../constant/message.interface";
import { AppDataSource } from "../configs/psqllDB.config";
import { User } from "../entity/user/user.entity";
const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = envConfig
export class VerifyToken {
  static async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies?.access_token || req.headers["authorization"]?.split(" ")[1];

      if (!token) {
        const refreshToken = req.cookies?.refresh_token;
        if (!refreshToken) {
          return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: Message.ACCESS_TOKEN_MISSING });
        }

        let refreshDecoded: string | object;
        try {
          refreshDecoded = jwt.verify(
            refreshToken,
            REFRESH_TOKEN_SECRET as string
          );
        } catch (err) {
          if (err instanceof jwt.TokenExpiredError) {
            return res
              .status(HTTP_STATUS.UNAUTHORIZED)
              .json({ message: "Token expired please login again" });
          }
          return res
            .status(HTTP_STATUS.UNAUTHORIZED)
            .json({ message: Message.INVALID_OR_EXPIRED_TOKEN });
        }
        if (
          typeof refreshDecoded !== "object" ||
          refreshDecoded === null ||
          !("id" in refreshDecoded)
        ) {
          return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: Message.INVALID_OR_EXPIRED_TOKEN });
        }

        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.findOne({
          where: { id: String((refreshDecoded as any).id) },
        });
        if (!user) {
          return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: Message.INVALID_OR_EXPIRED_TOKEN });
        }

        const accessToken = jwt.sign(
          {
            id: user.id,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            isActive: user.isActive,
          },
          ACCESS_TOKEN_SECRET as string,
          { expiresIn: "15m" }
        );

        res.cookie("access_token", accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 15 * 60 * 1000,
        });

        (req as Request & { user?: UserPayload }).user = {
          id: user.id,
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          isActive: user.isActive,
        };

        return next();
      }

      // jwt.verify returns string | object, so we need type guard
      let decoded: string | object;
      try {
        decoded = jwt.verify(token, ACCESS_TOKEN_SECRET as string);
      } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
          return res
            .status(HTTP_STATUS.UNAUTHORIZED)
            .json({ message: "Token expired please login again" });
        }
        return res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .json({ message: Message.INVALID_OR_EXPIRED_TOKEN });
      }
      if (
        typeof decoded !== "object" ||
        decoded === null ||
        !("id" in decoded) ||
        !("email" in decoded) ||
        !("role" in decoded) ||
        !("firstName" in decoded) ||
        !("lastName" in decoded) ||
        !("isActive" in decoded)
      ) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: Message.INVALID_TOKEN_PAYLOAD });
      }

      // TypeScript now knows decoded has id & email
      (req as Request & { user?: UserPayload }).user = decoded as UserPayload;

      next();
    } catch (err) {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: Message.INVALID_OR_EXPIRED_TOKEN });
    }
  }
}



