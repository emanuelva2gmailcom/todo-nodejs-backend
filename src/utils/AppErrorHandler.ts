import { NextFunction, Request, Response } from "express";
import AppError from "./AppError";

export const appErrorhandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('apperrorhandler aqui')
  error.status = error.status || "error";
  error.statusCode = error.statusCode || 500;

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};
