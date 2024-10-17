import { Task } from "../models/task.js";

class TaskService {
  // Function to get all tasks
  async getTasks() {
    try {
      return await Task.findAll();
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw new Error("Could not retrieve tasks");
    }
  }

  // Function to get a single task by ID
  async getTaskById(id) {
    try {
      const task = await Task.findOne({ where: { id } });
      if (!task) {
        throw new Error("task not found");
      }
      return task;
    } catch (error) {
      console.error("Error fetching task:", error);
      throw new Error("Could not retrieve task");
    }
  }

  // Function to add a new task
  async addTask(taskData) {
    try {
      const task = await Task.create(taskData);
      return task;
    } catch (error) {
      console.error("Error adding task:", error);
      throw new Error("Could not create task");
    }
  }

  async updateTask(taskId, taskData) {
    try {
      const task = await Task.findOne({ where: { id: taskId } });
      if (!task) {
        throw new Error("task not found");
      }

      await Task.update(taskData, { where: { id: taskId } });
      const updatedTask = await Task.findOne({ where: { id: taskId } });
      return updatedTask;
    } catch (error) {
      console.error("Error updating task:", error);
      throw new Error("Could not updating task");
    }
  }
}

// Create an instance of the taskController
const taskService = new TaskService();

// Export the instance and its methods
export const { getTasks, getTaskById, addTask, updateTask } = taskService;
