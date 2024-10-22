import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  res.status(500).send("Something went wrong");
};
