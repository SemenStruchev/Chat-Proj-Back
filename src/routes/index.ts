import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.ts";
import { privateUserRouter, publicUserRouter } from "./userRoutes.ts";

const router = Router();

//User routes
router.use("/user", publicUserRouter);
router.use("/user", verifyToken, privateUserRouter);

export default router;
