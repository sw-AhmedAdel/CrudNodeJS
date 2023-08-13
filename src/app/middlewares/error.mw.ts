import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/error.util";
import vars from "../config/variables.config";
import * as loggingUtil from "../utils/logging.util";
export default (
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message, statusCode } = error;
  res.locals.message = message;
  loggingUtil.error(
    `${req.protocol} | ${req.method}| ${statusCode} | body :  ${JSON.stringify(
      req.body
    )} |${req.originalUrl} |${message}`
  );
  if (vars.NODE_ENV === "dev")
    res.status(statusCode).json({
      message,
    });
  res.status(500).json({
    message: "internal server error",
  });
};
