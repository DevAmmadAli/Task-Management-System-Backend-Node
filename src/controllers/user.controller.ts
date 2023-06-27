import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendResponse, { HttpStatusKeys } from "../helper/responseHandler";
import User from "../models/user.model";
import ToDo from "../models/todo.model";
import getTokenPayload from "../helper/getTokenPayload";

const maxAge = 60 * 60;

const createJWT = (userId: string) => {
  return jwt.sign({ userId }, process.env.SECRETKEY as string, {
    expiresIn: maxAge,
  });
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    let hashPassword;
    if (password) {
      const salt = await bcrypt.genSalt();
      hashPassword = await bcrypt.hash(password, salt);
    }
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    return sendResponse(
      res,
      HttpStatusKeys.CREATED,
      "User Created Successfully",
      user
    );
  } catch (error) {
    return sendResponse(res, HttpStatusKeys.INTERNAL_SERVER_ERROR, "", error);
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (email && password) {
      const user = await User.findOne({ email });

      if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
          const token = createJWT(user._id.toString());
          res.cookie("token", token, {
            maxAge: maxAge * 6000,
          });

          return sendResponse(
            res,
            HttpStatusKeys.OK,
            "User Login Successfully",
            token
          );
        }

        return sendResponse(
          res,
          HttpStatusKeys.UNAUTHORIZED,
          "Incorrect Password"
        );
      }
    }

    return sendResponse(res, HttpStatusKeys.NOT_FOUND, "User Not Found");
  } catch (error) {
    return sendResponse(res, HttpStatusKeys.INTERNAL_SERVER_ERROR, "", error);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return users
      ? sendResponse(res, HttpStatusKeys.OK, "Users Fetch Successfully", users)
      : sendResponse(res, HttpStatusKeys.NOT_FOUND);
  } catch (err) {
    sendResponse(res, HttpStatusKeys.INTERNAL_SERVER_ERROR, "", err);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate({
      path: "todos",
      model: ToDo,
    });

    return user
      ? sendResponse(res, HttpStatusKeys.OK, "User Fetch Successfully", user)
      : sendResponse(res, HttpStatusKeys.NOT_FOUND);
  } catch (error) {
    sendResponse(res, HttpStatusKeys.INTERNAL_SERVER_ERROR, "", error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      await user.deleteOne();
      return sendResponse(res, HttpStatusKeys.DELETED, "User Deleted", user);
    }
    return sendResponse(res, HttpStatusKeys.NOT_FOUND, "User Not Found");
  } catch (error) {
    sendResponse(res, HttpStatusKeys.INTERNAL_SERVER_ERROR, "", error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let { password } = req.body;

    let hashPassword;
    if (password) {
      const salt = await bcrypt.genSalt();
      hashPassword = await bcrypt.hash(password, salt);
    }

    const user = await User.findById(id);
    if (user) {
      const updateFields = hashPassword
        ? { ...req.body, password: hashPassword }
        : { ...req.body };

      const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        updateFields,
        {
          new: true,
        }
      );
      return sendResponse(res, HttpStatusKeys.UPDATED, "", updatedUser);
    }
    return sendResponse(res, HttpStatusKeys.NOT_FOUND, "User Not Found");
  } catch (error) {
    sendResponse(res, HttpStatusKeys.INTERNAL_SERVER_ERROR, "", error);
  }
};

export const getLoginUser = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;

    const userId = getTokenPayload("userId", token);

    const user = await User.findById(userId);

    return sendResponse(
      res,
      HttpStatusKeys.OK,
      "User Fetch Successfully",
      user
    );
  } catch (error) {
    return sendResponse(res, HttpStatusKeys.INTERNAL_SERVER_ERROR, "", error);
  }
};
