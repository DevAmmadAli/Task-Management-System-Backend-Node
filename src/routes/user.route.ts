import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getLoginUser,
  getUser,
  updateUser,
  userLogin,
} from "../controllers/user.controller";
import userValidate from "../validators/user.validator";
import tokenAuthentication from "../middlewares/auth.middleware";

const userRoutes = Router();

userRoutes
  .get("/", tokenAuthentication, getAllUsers) // GET /user - Return the list of users
  .get("/current", tokenAuthentication, getLoginUser) // GET /user/current get the current login user
  .get("/:id", tokenAuthentication, getUser) // GET /user/{id} - Return user with the id specified
  .post("/", userValidate, createUser) // POST /user - Adds a new user
  .post("/login", userValidate, userLogin) // POST /user - Adds a new user
  .put("/:id", tokenAuthentication, updateUser) // PUT /user/{id} - Update fields of a user
  .delete("/:id", tokenAuthentication, deleteUser); // DELETE /user/{id} - delete a user

export default userRoutes;
