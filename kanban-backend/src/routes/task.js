import express from "express";
import {
  getAllTasks,
  getOneTask,
  addNewTask,
  updateTaskStatus,
} from "../controllers/task.controller.js";
import { newTaskValidator, Validation } from "../validation/task.validation.js";
import { authMiddleware } from "../middleware/auth.js";

const taskRouter = express.Router();

//Protected routes
taskRouter.get("/", authMiddleware, getAllTasks);
taskRouter.get("/:id", authMiddleware, getOneTask);
taskRouter.post("/", authMiddleware, newTaskValidator(), Validation, addNewTask);
taskRouter.put("/:id/status", authMiddleware, updateTaskStatus);

export default taskRouter;
