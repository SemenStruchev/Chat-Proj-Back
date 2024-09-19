import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.ts";
import { publicUserRouter } from "./userRoutes/public.ts";
import { privateUserRouter } from "./userRoutes/private.ts";
import { publicAuthRouter } from "./authRoutes/public.ts";
import privateChatRouter from "./chatRoutes/private.ts";
import privateMessagesRouter from "./messageRoutes/private.ts";

const router = Router();

//Auth routes
router.use("/auth", publicAuthRouter);

//User routes
router.use("/user", publicUserRouter);
router.use("/user", verifyToken, privateUserRouter);

//Chat routes
router.use("/chat", verifyToken, privateChatRouter);

//Chat routes
router.use("/messages", verifyToken, privateMessagesRouter);

export default router;
