import { Router } from "express";
import {
  getUser,
  createUser,
  updateUser,
  register,
  login,
} from "../controllers/userController.ts";

export const publicUserRouter = Router();
export const privateUserRouter = Router();

// Public routes
publicUserRouter.get("/", getUser);
publicUserRouter.post("/", createUser);
publicUserRouter.post("/login", login);
publicUserRouter.post("/register", register);

// Secure route for updating a user
privateUserRouter.put("/:id", updateUser);
