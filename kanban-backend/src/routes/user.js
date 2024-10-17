import express from "express";
import {
  getAllUsers,
  getOneUser,
} from '../controllers/user.controller.js';
import { authMiddleware} from '../middleware/auth.js';

const usersRouter = express.Router();

//Protected routes
usersRouter.get('/', authMiddleware, getAllUsers);
usersRouter.get('/:id', authMiddleware, getOneUser);

export default usersRouter;
