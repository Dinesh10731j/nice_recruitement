import jwt from "jsonwebtoken";
import { User } from "../entity/user/user.entity";
import { envConfig } from "../configs/env.config";

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = envConfig;

if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
  throw new Error("Token secrets are missing!");
}

export const generateAccessToken = (user: User): string => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
};

export const generateRefreshToken = (user: User): string => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
    },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
};
