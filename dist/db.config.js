"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const createConnection = () => {
    const dbUrl = (process.env.NODE_ENV == "development"
        ? process.env.DB_CONN_STRING_LOCAL
        : process.env.DB_CONN_STRING_PROD);
    return mongoose_1.default.connect(dbUrl);
};
exports.default = createConnection;
