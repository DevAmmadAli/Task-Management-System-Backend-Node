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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.signupValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const responseHandler_1 = __importStar(require("../helper/responseHandler"));
exports.signupValidation = joi_1.default.object({
    firstName: joi_1.default.string().max(12).required(),
    lastName: joi_1.default.string().max(12).required(),
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string()
        .required()
        .min(8)
        .max(12)
        .pattern(new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])")),
});
exports.loginValidation = joi_1.default.object({
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().required(),
});
const userValidate = (req, res, next) => {
    const { error } = req.url == "/login"
        ? exports.loginValidation.validate(req.body)
        : exports.signupValidation.validate(req.body);
    if (error) {
        if (error.details[0].type == "string.pattern.base") {
            return (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.BAD_REQUEST, "Password mush have one special character, one upper & lower case character\
        and one number");
        }
        return (0, responseHandler_1.default)(res, responseHandler_1.HttpStatusKeys.BAD_REQUEST, error.message);
    }
    next();
};
exports.default = userValidate;
