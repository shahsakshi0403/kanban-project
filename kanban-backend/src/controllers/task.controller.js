import {
  getTasks,
  getTaskById,
  addTask,
  updateTask,
} from "../services/task.service.js";

class TaskController {
  // Method to get all tasks
  async getAllTasks(req, res) {
    try {
      const tasks = await getTasks();
      res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  // Method to get a single task by ID
  async getOneTask(req, res) {
    try {
      const taskId = Number(req.params.id);
      const task = await getTaskById(taskId);
      if (!task) {
        return res.status(404).json({ message: "task not found" });
      }
      res.status(200).json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  // Method to add a new task
  async addNewTask(req, res) {
    try {
      const ownerId = req.user.id;

      // Create a new task object with the ownerId and default status
      const taskData = {
        ...req.body,
        ownerId: ownerId,
        status: "inProgress",
      };

      const newtask = await addTask(taskData);
      res.status(201).json(newtask);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Bad Request", error });
    }
  }

  // Method to update a new task
  async updateTaskStatus(req, res) {
    try {
      const taskId = Number(req.params.id);
      const assigneeId = req.user.id;

      // Create a new task object with the assigneeId and default status
      const taskData = {
        ...req.body,
        assigneeId: assigneeId,
      };

      let updatedTask;
      if (req.body.status === "done") {
        const task = await getTaskById(taskId);
        if (task.ownerId === assigneeId) {
          updatedTask = await updateTask(taskId, taskData);
        } else {
          return res
            .status(400)
            .json({ message: "You do not have permission to done the status" });
        }
      } else {
        updatedTask = await updateTask(taskId, taskData);
      }
      res.status(200).json(updatedTask);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Bad Request", error });
    }
  }
}

// Create an instance of the taskController
const taskController = new TaskController();

// Export the instance and its methods
export const { getAllTasks, getOneTask, addNewTask, updateTaskStatus } =
  taskController;
