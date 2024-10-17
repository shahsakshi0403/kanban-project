import express from "express";
import cors from "cors";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/user.js";
import taskRouter from './routes/task.js';
import { sequelize } from './config/database.js';

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

//passport

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.PASSPORT_CLIENT_ID ?? "",
//       clientSecret: process.env.PASSPORT_CLIENT_SECRET ?? "",
//       callbackURL: "/auth/google/callback",
//       scope: ["profile", "email"],
//     },
//     function (accessToken, refreshToken, profile, done) {
//       // Implement your verification logic here
//       done(null, profile);
//     }
//   )
// );

// // Serialize user into session
// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// // Deserialize user from session
// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

//cors
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/task", taskRouter);

const PORT = 8080;
const startServer = async () => {
  try {
      await sequelize.sync(); // Sync all models
      console.log("All models were synchronized successfully.");
      
      app.listen(PORT, () => {
          console.log(`Server is running on http://localhost:${PORT}`);
      });
  } catch (error) {
      console.error("Unable to connect to the database:", error);
  }
};

startServer();