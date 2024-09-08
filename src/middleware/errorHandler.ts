import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const success = statusCode < 400;

  res.status(statusCode).json({
    success,
    code: statusCode,
    message: success ? undefined : err.message,
    data: success ? err : undefined,
  });
};

// Middleware to wrap async functions
export const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
