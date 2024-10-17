import { Router } from "express";
import passport from "passport";
import {
  newUserValidator,
  loginValidator,
  Validation,
} from "../validation/user.validation.js";
import { addNewUser, login } from "../controllers/user.controller.js";

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
router.get("/logout", (req, res) => {
  // req.logout();
  // res.redirect(process.env.REACT_APP_URL);

  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: "Logout failed",
      });
    }
    res.redirect(process.env.REACT_APP_URL ?? "http://localhost:3000");
  });
});

export default router;
