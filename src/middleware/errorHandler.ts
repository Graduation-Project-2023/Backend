import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let status = err.status || 500;
  let message = err.message || "Internal Server Error";
  if (err.code?.startsWith("P20")) {
    status = 400;
    message = err.meta;
  }

  res.status(status).json({
    success: false,
    status,
    message,
    stack: err.stack,
  });
};

export default errorHandler;
