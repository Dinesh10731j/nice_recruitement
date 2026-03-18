import type { NextFunction, Request, Response } from "express";

export const httpLogger = (
  _req: Request,
  _res: Response,
  next: NextFunction
): void => {
  next();
};
