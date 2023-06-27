import mongoose, { Model, Schema } from "mongoose";
import { TodoAttributes } from "./todo.model";

export interface UserModel extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
  todos: TodoAttributes;
}

const userSchema = new Schema<UserModel>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    todos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ToDo",
      },
    ],
  },
  { timestamps: true }
);

const User: Model<UserModel> = mongoose.model("User", userSchema);

export default User;
