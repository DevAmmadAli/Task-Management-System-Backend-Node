import { Request, Response } from "express";
import mongoose from "mongoose";
import ToDo from "../models/todo.model";
import User, { UserModel } from "../models/user.model";
import sendResponse, { HttpStatusKeys } from "../helper/responseHandler";
import getTokenPayload from "../helper/getTokenPayload";

export const addToDo = async (req: Request, res: Response) => {
  try {
    const { title, description, dueDate } = req.body;

    const token = req.cookies.token;

    const userId = getTokenPayload("userId", token);

    let user = User.findById(userId);

    let toDo = new ToDo({
      title,
      description,
      dueDate,
      user: userId,
    });

    await toDo.save();

    const updatedUser = await User.updateOne(
      { _id: userId },
      {
        $push: { todos: [toDo._id] },
      }
    );

    return sendResponse(
      res,
      HttpStatusKeys.CREATED,
      "Todo Created Successfully",
      toDo
    );
  } catch (error) {
    return sendResponse(res, HttpStatusKeys.INTERNAL_SERVER_ERROR, "", error);
  }
};

export const getToDos = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;

    const userId = getTokenPayload("userId", token);

    const user = await User.findById(userId).populate({
      path: "todos",
      model: ToDo,
    });

    return sendResponse(
      res,
      HttpStatusKeys.OK,
      "Todos Fetch Successfully",
      user
    );
  } catch (error) {
    return sendResponse(res, HttpStatusKeys.INTERNAL_SERVER_ERROR, "", error);
  }
};

export const getToDo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const IdTypeCheck = mongoose.Types.ObjectId.isValid(id);
    if (IdTypeCheck) {
      const toDo = await ToDo.findById(id);
      if (toDo) {
        return sendResponse(
          res,
          HttpStatusKeys.OK,
          "Todo Fetch Successfully",
          toDo
        );
      }
    }
    return sendResponse(res, HttpStatusKeys.NOT_FOUND, "User Not Found");
  } catch (error) {
    return sendResponse(res, HttpStatusKeys.INTERNAL_SERVER_ERROR, "", error);
  }
};

export const deleteToDo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const IdTypeCheck = mongoose.Types.ObjectId.isValid(id);
    if (IdTypeCheck) {
      const toDo = await ToDo.findById(id);
      if (toDo) {
        const token = req.cookies.token;

        const userId = getTokenPayload("userId", token);

        let user = User.findById(userId);

        const updatedUser = await User.updateOne(
          { _id: userId },
          {
            $pullAll: { todos: [id] },
          }
        );
        await toDo.deleteOne();
        return sendResponse(res, HttpStatusKeys.DELETED);
      }
    }
    return sendResponse(res, HttpStatusKeys.NOT_FOUND, "Todo Not Found");
  } catch (error) {
    return sendResponse(res, HttpStatusKeys.INTERNAL_SERVER_ERROR, "", error);
  }
};

export const updateToDo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const IdTypeCheck = mongoose.Types.ObjectId.isValid(id);
    const toDo = await ToDo.findById(id);
    if (IdTypeCheck && toDo) {
      const updatedToDo = await ToDo.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        {
          new: true,
        }
      );
      return sendResponse(res, HttpStatusKeys.UPDATED, "", updatedToDo);
    }
    return sendResponse(res, HttpStatusKeys.NOT_FOUND, "Todo Not Found");
  } catch (error) {
    return sendResponse(res, HttpStatusKeys.INTERNAL_SERVER_ERROR, "", error);
  }
};
