import express from "express";
import createConnection from "./db.config";
import dotenv from "dotenv";
import taskRoutes from "./routes/task.route";
import userRoutes from "./routes/user.route";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);

createConnection()
  .then(() => {
    console.log("Connected with Database");
    app.listen(PORT, () => {
      console.log(`API Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Failed to connect with Database: ${error}`);
  });
