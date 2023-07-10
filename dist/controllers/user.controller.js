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
exports.getLoginUser = exports.updateUser = exports.deleteUser = exports.getUser = exports.getAllUsers = exports.userLogin = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const responseHandler_1 = __importStar(require("../helper/responseHandler"));
const user_model_1 = __importDefault(require("../models/user.model"));
const task_model_1 = __importDefault(require("../models/task.model"));
const getTokenPayload_1 = __importDefault(require("../helper/getTokenPayload"));
const maxAge = 60 * 60;
const createJWT = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, process.env.SECRETKEY, {
        expiresIn: maxAge,
    });
};
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password } = req.body;
        let hashPassword;
        if (password) {
            const salt = yield bcrypt_1.default.genSalt();
            hashPassword = yield bcrypt_1.default.hash(password, salt);
        }
        const user = yield user_model_1.default.create({
            firstName,
            lastName,
            email,
            password: hashPassword,
        });
        return (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.CREATED, "User Created Successfully", user);
    }
    catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.code) == 11000) {
            return (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.BAD_REQUEST, "User with this email address is already exist");
        }
        return (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.INTERNAL_SERVER_ERROR, "", error);
    }
});
exports.createUser = createUser;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const user = yield user_model_1.default.findOne({ email });
            if (user) {
                const auth = yield bcrypt_1.default.compare(password, user.password);
                if (auth) {
                    const token = createJWT(user._id.toString());
                    res.cookie("token", token, {
                        maxAge: maxAge * 6000,
                    });
                    return (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.OK, "User Login Successfully", token);
                }
                return (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.UNAUTHORIZED, "Incorrect Password");
            }
        }
        return (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.NOT_FOUND, "User Not Found");
    }
    catch (error) {
        return (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.INTERNAL_SERVER_ERROR, "", error);
    }
});
exports.userLogin = userLogin;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find();
        return users
            ? (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.OK, "Users Fetch Successfully", users)
            : (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.NOT_FOUND);
    }
    catch (err) {
        (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.INTERNAL_SERVER_ERROR, "", err);
    }
});
exports.getAllUsers = getAllUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield user_model_1.default.findById(id).populate({
            path: "tasks",
            model: task_model_1.default,
        });
        return user
            ? (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.OK, "User Fetch Successfully", user)
            : (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.NOT_FOUND);
    }
    catch (error) {
        (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.INTERNAL_SERVER_ERROR, "", error);
    }
});
exports.getUser = getUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield user_model_1.default.findById(id);
        if (user) {
            yield user.deleteOne();
            return (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.DELETED, "User Deleted");
        }
        return (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.NOT_FOUND, "User Not Found");
    }
    catch (error) {
        (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.INTERNAL_SERVER_ERROR, "", error);
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let { password } = req.body;
        let hashPassword;
        if (password) {
            const salt = yield bcrypt_1.default.genSalt();
            hashPassword = yield bcrypt_1.default.hash(password, salt);
        }
        const user = yield user_model_1.default.findById(id);
        if (user) {
            const updateFields = hashPassword
                ? Object.assign(Object.assign({}, req.body), { password: hashPassword }) : Object.assign({}, req.body);
            const updatedUser = yield user_model_1.default.findOneAndUpdate({ _id: id }, updateFields, {
                new: true,
            });
            return (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.UPDATED, "", updatedUser);
        }
        return (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.NOT_FOUND, "User Not Found");
    }
    catch (error) {
        (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.INTERNAL_SERVER_ERROR, "", error);
    }
});
exports.updateUser = updateUser;
const getLoginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        const userId = (0, getTokenPayload_1.default)("userId", token);
        const user = yield user_model_1.default.findById(userId);
        return (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.OK, "User Fetch Successfully", user);
    }
    catch (error) {
        return (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.INTERNAL_SERVER_ERROR, "", error);
    }
});
exports.getLoginUser = getLoginUser;
