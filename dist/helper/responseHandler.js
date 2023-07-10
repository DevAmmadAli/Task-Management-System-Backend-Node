"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatusKeys = void 0;
const statusCodes_1 = __importDefault(require("./statusCodes"));
var HttpStatusKeys;
(function (HttpStatusKeys) {
    HttpStatusKeys["OK"] = "OK";
    HttpStatusKeys["NOT_FOUND"] = "NOT_FOUND";
    HttpStatusKeys["DELETED"] = "DELETED";
    HttpStatusKeys["CREATED"] = "CREATED";
    HttpStatusKeys["UPDATED"] = "UPDATED";
    HttpStatusKeys["UNAUTHORIZED"] = "UNAUTHORIZED";
    HttpStatusKeys["FORBIDDEN"] = "FORBIDDEN";
    HttpStatusKeys["BAD_REQUEST"] = "BAD_REQUEST";
    HttpStatusKeys["ROUTE_NOT_FOUND"] = "ROUTE_NOT_FOUND";
    HttpStatusKeys["INTERNAL_SERVER_ERROR"] = "INTERNAL_SERVER_ERROR";
})(HttpStatusKeys || (exports.HttpStatusKeys = HttpStatusKeys = {}));
const sendResponse = (res, status, message, body) => {
    if (body) {
        return res
            .status(statusCodes_1.default[status].code)
            .json({ message: message || statusCodes_1.default[status].message, body });
    }
    else {
        return res
            .status(statusCodes_1.default[status].code)
            .json({ message: message || statusCodes_1.default[status].message });
    }
};
exports.default = sendResponse;
