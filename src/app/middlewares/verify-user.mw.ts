import { verify as jwtVerify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import Iuser from "../types/user.type";
import ApiError from "../utils/error.util";

export async function verifyUserMW(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let token = "";
  try {
    if (
      req.headers["authorization"]?.startsWith(`${process.env.BEARER_SECRET}`)
    ) {
      token = req.headers["authorization"].split(" ")[1];
    }

    if (!token) {
      throw Error("In-valid Token");
    }

    const decoded = jwtVerify(token, process.env.TOKEN_SIGNATURE);
    console.log(decoded);
    req.user = decoded as Iuser;
    next();
  } catch (error) {
    next(new ApiError(error.message, error.status));
  }
}
