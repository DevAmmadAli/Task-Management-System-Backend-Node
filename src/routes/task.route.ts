import { Router } from "express";
import {
  addTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/task.controller";
import tokenAuthentication from "../middlewares/auth.middleware";

const taskRoutes = Router();

taskRoutes
  .get("/", tokenAuthentication, getTasks) // GET /task - Returns a task-list
  .get("/:id", tokenAuthentication, getTask) // GET /task/{id} - Returns a task with the id specified
  .post("/", tokenAuthentication, addTask) // POST /task - Adds a new task
  .put("/:id", tokenAuthentication, updateTask) // PUT /task/{id} - Update fields of a task
  .delete("/:id", tokenAuthentication, deleteTask); // DELETE /task/{id} - delete a task

export default taskRoutes;
