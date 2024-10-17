import { Router } from "express";
import passport from "passport";
import {
  newUserValidator,
  loginValidator,
  Validation,
} from "../validation/user.validation.js";
import { addNewUser, login } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import { User } from "../models/user.js";

const router = Router();

router.post("/login", loginValidator(), Validation, login);
router.post("/register", newUserValidator(), Validation, addNewUser);

// Route for failed login
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Login Failed",
  });
});

// Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.REACT_APP_URL,
    failureRedirect: "/login/failed",
  })
);

// Initiate Google OAuth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Logout route
router.get("/logout", authMiddleware, async (req, res) => {
  const userId = Number(req.param.id);
  // Nullify the user's token in the database
  const data = await User.update({ token: null }, { where: { id: userId } });
  return res.status(200).json({
    error: false,
    message: "Logout succesfully",
  });
});

export default router;
