import { Request, Response, NextFunction, RequestHandler } from "express";
import logger from "../config/logger.ts";

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Server Error";

  logger.error(`Error: ${message}, Status Code: ${statusCode}`);

  res.status(statusCode).json({
    success: false,
    code: statusCode,
    message,
  });
};

// Middleware to wrap async functions
export const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export const successResponseHandler: RequestHandler = (
  req: Request,
  res: any,
  next: NextFunction
) => {
  res.success = (data: any, message?: string, statusCode: number = 200) => {
    res.status(statusCode).json({
      success: true,
      code: statusCode,
      message,
      data: data || {},
    });
  };
  next();
};
