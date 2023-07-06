import mongoose, { Document, Model, Schema } from "mongoose";
import { UserModel } from "./user.model";

export interface TaskAttributes extends Document {
  title: string;
  description: string;
  dueDate: Date;
}

interface TaskModel extends TaskAttributes {
  user: UserModel;
}

const taskSchema = new Schema<TaskModel>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Task: Model<TaskModel> = mongoose.model("task", taskSchema);

export default Task;
