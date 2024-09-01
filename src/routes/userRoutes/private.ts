import { Router } from "express";
import { updateUser } from "../../controllers/userController.ts";

export const privateUserRouter = Router();

// Secure route for updating a user
privateUserRouter.put("/:id", updateUser);
