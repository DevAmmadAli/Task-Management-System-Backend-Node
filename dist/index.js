"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_config_1 = __importDefault(require("./db.config"));
const dotenv_1 = __importDefault(require("dotenv"));
const task_route_1 = __importDefault(require("./routes/task.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const frontendOrigin = process.env.NODE_ENV == "development"
    ? process.env.FRONTEND_ORIGIN_LOCAL
    : process.env.FRONTEND_ORIGIN_PROD;
app.use((0, cors_1.default)({ origin: frontendOrigin, credentials: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use("/tasks", task_route_1.default);
app.use("/users", user_route_1.default);
(0, db_config_1.default)()
    .then(() => {
    console.log("Connected with Database");
    app.listen(PORT, () => {
        console.log(`API Server is running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.error(`Failed to connect with Database: ${error}`);
});
exports.default = app;
