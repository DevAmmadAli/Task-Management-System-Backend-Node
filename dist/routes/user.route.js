"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const user_validator_1 = __importDefault(require("../validators/user.validator"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const userRoutes = (0, express_1.Router)();
userRoutes
    .get("/", auth_middleware_1.default, user_controller_1.getAllUsers) // GET /user - Return the list of users
    .get("/current", auth_middleware_1.default, user_controller_1.getLoginUser) // GET /user/current get the current login user
    .get("/:id", auth_middleware_1.default, user_controller_1.getUser) // GET /user/{id} - Return user with the id specified
    .post("/", user_validator_1.default, user_controller_1.createUser) // POST /user - Adds a new user
    .post("/login", user_validator_1.default, user_controller_1.userLogin) // POST /user - Adds a new user
    .put("/:id", auth_middleware_1.default, user_controller_1.updateUser) // PUT /user/{id} - Update fields of a user
    .delete("/:id", auth_middleware_1.default, user_controller_1.deleteUser); // DELETE /user/{id} - delete a user
exports.default = userRoutes;
