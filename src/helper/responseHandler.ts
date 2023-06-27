import { Response } from "express";
import HttpStatus from "./statusCodes";

export enum HttpStatusKeys {
  OK = "OK",
  NOT_FOUND = "NOT_FOUND",
  DELETED = "DELETED",
  CREATED = "CREATED",
  UPDATED = "UPDATED",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  BAD_REQUEST = "BAD_REQUEST",
  ROUTE_NOT_FOUND = "ROUTE_NOT_FOUND",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

const sendResponse = (
  res: Response,
  status: HttpStatusKeys,
  message?: string,
  body?: any
) => {
  if (body) {
    return res
      .status(HttpStatus[status].code)
      .json({ message: message || HttpStatus[status].message, body });
  } else {
    return res
      .status(HttpStatus[status].code)
      .json({ message: message || HttpStatus[status].message });
  }
};

export default sendResponse;
