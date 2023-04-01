import { NextFunction, Request, Response } from "express";
import AppError from "./AppError";

export const Exception404 = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(new AppError(404, `Route ${req.originalUrl} not found`));
};
