import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import sendResponse, { HttpStatusKeys } from "../helper/responseHandler";

export const signupValidation = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string()
    .required()
    .min(8)
    .max(12)
    .pattern(new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])")),
});

export const loginValidation = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

const userValidate = (req: Request, res: Response, next: NextFunction) => {
  const { error } =
    req.url == "/login"
      ? loginValidation.validate(req.body)
      : signupValidation.validate(req.body);
  if (error) {
    if (error.details[0].type == "string.pattern.base") {
      return sendResponse(
        res,
        HttpStatusKeys.BAD_REQUEST,
        "Password mush have 1 special character, one upper & lower case character, one number and 8 to 12 character length"
      );
    }
    return sendResponse(res, HttpStatusKeys.BAD_REQUEST, error.message);
  }
  next();
};

export default userValidate;
