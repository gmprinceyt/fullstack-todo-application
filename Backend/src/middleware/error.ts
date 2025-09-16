// global error catches middleware
import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/UtilsClass.js";

export const GlobalMiddleware = (
  err: CustomError,
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
