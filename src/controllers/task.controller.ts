import { Request, Response } from "express";
import mongoose from "mongoose";
import Task from "../models/task.model";
import User, { UserModel } from "../models/user.model";
import sendResponse, { HttpStatusKeys } from "../helper/responseHandler";
import getTokenPayload from "../helper/getTokenPayload";

export const addTask = async (req: Request, res: Response) => {
  try {
    const { title, description, dueDate } = req.body;

    const token = req.cookies.token;

    const userId = getTokenPayload("userId", token);

    let user = User.findById(userId);

    let task = new Task({
      title,
      description,
      dueDate,
      user: userId,
    });

    await task.save();

    const updatedUser = await User.updateOne(
      { _id: userId },
      {
        $push: { tasks: [task._id] },
      }
    );

    return sendResponse(
      res,
      HttpStatusKeys.CREATED,
      "Task Created Successfully",
      task
    );
  } catch (error) {
    return sendResponse(res, HttpStatusKeys.INTERNAL_SERVER_ERROR, "", error);
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;

    const userId = getTokenPayload("userId", token);

    const user = await User.findById(userId).populate({
      path: "tasks",
      model: Task,
    });

    return sendResponse(
      res,
      HttpStatusKeys.OK,
      "Tasks Fetch Successfully",
      user
    );
  } catch (error) {
    return sendResponse(res, HttpStatusKeys.INTERNAL_SERVER_ERROR, "", error);
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const IdTypeCheck = mongoose.Types.ObjectId.isValid(id);
    if (IdTypeCheck) {
      const task = await Task.findById(id);
      if (task) {
        return sendResponse(
          res,
          HttpStatusKeys.OK,
          "Task Fetch Successfully",
          task
        );
      }
    }
    return sendResponse(res, HttpStatusKeys.NOT_FOUND, "User Not Found");
  } catch (error) {
    return sendResponse(res, HttpStatusKeys.INTERNAL_SERVER_ERROR, "", error);
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const IdTypeCheck = mongoose.Types.ObjectId.isValid(id);
    if (IdTypeCheck) {
      const task = await Task.findById(id);
      if (task) {
        const token = req.cookies.token;

        const userId = getTokenPayload("userId", token);

        let user = User.findById(userId);

        const updatedUser = await User.updateOne(
          { _id: userId },
          {
            $pullAll: { tasks: [id] },
          }
        );
        await task.deleteOne();
        return sendResponse(res, HttpStatusKeys.DELETED);
      }
    }
    return sendResponse(res, HttpStatusKeys.NOT_FOUND, "Task Not Found");
  } catch (error) {
    return sendResponse(res, HttpStatusKeys.INTERNAL_SERVER_ERROR, "", error);
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const IdTypeCheck = mongoose.Types.ObjectId.isValid(id);
    const task = await Task.findById(id);
    if (IdTypeCheck && task) {
      const updatedTask = await Task.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        {
          new: true,
        }
      );
      return sendResponse(res, HttpStatusKeys.UPDATED, "", updatedTask);
    }
    return sendResponse(res, HttpStatusKeys.NOT_FOUND, "Task Not Found");
  } catch (error) {
    return sendResponse(res, HttpStatusKeys.INTERNAL_SERVER_ERROR, "", error);
  }
};
