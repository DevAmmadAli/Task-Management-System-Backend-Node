import { Router } from "express";
import {
  addToDo,
  deleteToDo,
  getToDo,
  getToDos,
  updateToDo,
} from "../controllers/todo.controller";
import tokenAuthentication from "../middlewares/auth.middleware";

const todoRoutes = Router();

todoRoutes
  .get("/", tokenAuthentication, getToDos) // GET /todo - Returns a todo-list
  .get("/:id", tokenAuthentication, getToDo) // GET /todo/{id} - Returns a todo with the id specified
  .post("/", tokenAuthentication, addToDo) // POST /todo - Adds a new todo
  .put("/:id", tokenAuthentication, updateToDo) // PUT /todo/{id} - Update fields of a todo
  .delete("/:id", tokenAuthentication, deleteToDo); // DELETE /todo/{id} - delete a todo

export default todoRoutes;
