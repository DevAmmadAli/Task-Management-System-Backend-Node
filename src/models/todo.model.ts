import mongoose, { Document, Model, Schema } from "mongoose";
import { UserModel } from "./user.model";

export interface TodoAttributes extends Document {
  title: string;
  description: string;
  dueDate: Date;
}

interface TodoModel extends TodoAttributes {
  user: UserModel;
}

const toDoSchema = new Schema<TodoModel>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const ToDo: Model<TodoModel> = mongoose.model("toDo", toDoSchema);

export default ToDo;
