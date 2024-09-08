import { Router } from "express";
import {
  createUser,
  getUser,
} from "../../controllers/userController.ts";

export const publicUserRouter = Router();

// Public routes
publicUserRouter.get("/", getUser);
publicUserRouter.post("/", createUser);
