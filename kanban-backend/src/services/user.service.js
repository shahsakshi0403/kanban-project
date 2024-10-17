import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/jwtUtils.js";

class UserService {
  // Function to get all users
  async getUsers() {
    try {
      return await User.findAll();
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Could not retrieve users");
    }
  }

  // Function to get a single user by ID
  async getUserById(id) {
    try {
      const user = await User.findOne({ where: { id } });
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error("Could not retrieve user");
    }
  }

  // Function to validate user credentials and return token
  async validateUser(email, password) {
    const user = await User.findOne({ where: { email } });
    if (user) {
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (user && passwordCheck) {
        const token = generateToken({ id: user.id, email: user.email });
        return { user, token };
      }
    }
    throw new Error("User is not registered");
  }

  // Function to add a new user
  async addUser(userData) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hPassword = await bcrypt.hash(userData.password, salt);
      const user = await User.create({ ...userData, password: hPassword });

      return user;
    } catch (error) {
      console.error("Error adding user:", error);
      throw new Error("Could not create user");
    }
  }
}

// Create an instance of the UserController
const userService = new UserService();

// Export the instance and its methods
export const { getUsers, getUserById, addUser, validateUser } = userService;
