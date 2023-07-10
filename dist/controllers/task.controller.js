"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.deleteTask = exports.getTask = exports.getTasks = exports.addTask = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const task_model_1 = __importDefault(require("../models/task.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const responseHandler_1 = __importStar(require("../helper/responseHandler"));
const getTokenPayload_1 = __importDefault(require("../helper/getTokenPayload"));
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, dueDate } = req.body;
        const token = req.cookies.token;
        const userId = (0, getTokenPayload_1.default)("userId", token);
        let user = user_model_1.default.findById(userId);
        let task = new task_model_1.default({
            title,
            description,
            dueDate,
            user: userId,
        });
        yield task.save();
        const updatedUser = yield user_model_1.default.updateOne({ _id: userId }, {
            $push: { tasks: [task._id] },
        });
        return (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.CREATED, "Task Created Successfully", task);
    }
    catch (error) {
        return (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.INTERNAL_SERVER_ERROR, "", error);
    }
});
exports.addTask = addTask;
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        const userId = (0, getTokenPayload_1.default)("userId", token);
        const user = yield user_model_1.default.findById(userId).populate({
            path: "tasks",
            model: task_model_1.default,
        });
        return (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.OK, "Tasks Fetch Successfully", user);
    }
    catch (error) {
        return (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.INTERNAL_SERVER_ERROR, "", error);
    }
});
exports.getTasks = getTasks;
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const IdTypeCheck = mongoose_1.default.Types.ObjectId.isValid(id);
        if (IdTypeCheck) {
            const task = yield task_model_1.default.findById(id);
            if (task) {
                return (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.OK, "Task Fetch Successfully", task);
            }
        }
        return (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.NOT_FOUND, "Task Not Found");
    }
    catch (error) {
        return (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.INTERNAL_SERVER_ERROR, "", error);
    }
});
exports.getTask = getTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const IdTypeCheck = mongoose_1.default.Types.ObjectId.isValid(id);
        if (IdTypeCheck) {
            const task = yield task_model_1.default.findById(id);
            if (task) {
                const token = req.cookies.token;
                const userId = (0, getTokenPayload_1.default)("userId", token);
                let user = user_model_1.default.findById(userId);
                const updatedUser = yield user_model_1.default.updateOne({ _id: userId }, {
                    $pullAll: { tasks: [id] },
                });
                yield task.deleteOne();
                return (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.DELETED);
            }
        }
        return (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.NOT_FOUND, "Task Not Found");
    }
    catch (error) {
        return (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.INTERNAL_SERVER_ERROR, "", error);
    }
});
exports.deleteTask = deleteTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const IdTypeCheck = mongoose_1.default.Types.ObjectId.isValid(id);
        const task = yield task_model_1.default.findById(id);
        if (IdTypeCheck && task) {
            const updatedTask = yield task_model_1.default.findOneAndUpdate({ _id: id }, Object.assign({}, req.body), {
                new: true,
            });
            return (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.UPDATED, "", updatedTask);
        }
        return (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.NOT_FOUND, "Task Not Found");
    }
    catch (error) {
        return (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.INTERNAL_SERVER_ERROR, "", error);
    }
});
exports.updateTask = updateTask;
