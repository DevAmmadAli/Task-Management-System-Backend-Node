"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = require("../controllers/task.controller");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const taskRoutes = (0, express_1.Router)();
taskRoutes
    .get("/", auth_middleware_1.default, task_controller_1.getTasks) // GET /task - Returns a task-list
    .get("/:id", auth_middleware_1.default, task_controller_1.getTask) // GET /task/{id} - Returns a task with the id specified
    .post("/", auth_middleware_1.default, task_controller_1.addTask) // POST /task - Adds a new task
    .put("/:id", auth_middleware_1.default, task_controller_1.updateTask) // PUT /task/{id} - Update fields of a task
    .delete("/:id", auth_middleware_1.default, task_controller_1.deleteTask); // DELETE /task/{id} - delete a task
exports.default = taskRoutes;
