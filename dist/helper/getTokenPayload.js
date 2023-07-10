"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getTokenPayload = (payload, token) => {
    return jsonwebtoken_1.default.verify(token, process.env.SECRETKEY, (err, decodedToken) => {
        return decodedToken[payload];
    });
};
exports.default = getTokenPayload;
