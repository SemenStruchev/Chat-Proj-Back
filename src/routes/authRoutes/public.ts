import { Router } from "express";
import { login, register } from "../../controllers/authController.ts";

export const publicAuthRouter = Router();

// Public routes
publicAuthRouter.post("/login", login);
publicAuthRouter.post("/register", register);
