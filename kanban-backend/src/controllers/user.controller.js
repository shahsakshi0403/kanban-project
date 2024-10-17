import {
  getUsers,
  getUserById,
  addUser,
  validateUser,
} from "../services/user.service.js";

class UserController {
  // Method for user login
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { user, token } = await validateUser(email, password);
      res.status(200).json({ user, token });
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Unauthorized", error: error.message });
    }
  }

  // Method to get all users
  async getAllUsers(req, res) {
    try {
      const users = await getUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  // Method to get a single user by ID
  async getOneUser(req, res) {
    try {
      const userId = Number(req.params.id);
      const user = getUserById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  // Method to add a new user
  async addNewUser(req, res) {
    try {
      const newUser = await addUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Bad Request", error });
    }
  }
}

// Create an instance of the UserController
const userController = new UserController();

// Export the instance and its methods
export const { login, getAllUsers, getOneUser, addNewUser } = userController;
