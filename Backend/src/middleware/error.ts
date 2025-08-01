// global error catches middleware
import { NextFunction, Request, Response } from "express";
import { CoustomError } from "../utils/UtilsClass.js";

export const GlobalMiddleware = (
  err: CoustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const message = err.message || "internal Server Error";

  res.status(err.status || 500).json({
    success: false,
    message,
  });
};
