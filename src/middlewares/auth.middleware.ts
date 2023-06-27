import { NextFunction, Request, Response } from "express";
import sendResponse, { HttpStatusKeys } from "../helper/responseHandler";
import jwt from "jsonwebtoken";

const tokenAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(
      token,
      process.env.SECRETKEY as string,
      (err: any, decodedToken: any) => {
        if (err) {
          res.clearCookie("token");
          return sendResponse(res, HttpStatusKeys.UNAUTHORIZED, err.message);
        } else {
          next();
        }
      }
    );
  } else {
    return sendResponse(res, HttpStatusKeys.UNAUTHORIZED);
  }
};

export default tokenAuthentication;
