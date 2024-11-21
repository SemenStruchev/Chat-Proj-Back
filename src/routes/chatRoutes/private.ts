import { Router } from "express";
import {
  createChat,
  deleteChat,
  editChat,
  getUsersChats,
  inviteUserToChat,
} from "../../controllers/chatController.ts";

const privateChatRouter = Router();

privateChatRouter.post("", createChat);
privateChatRouter.get("/user/:userId", getUsersChats);
privateChatRouter.delete("/:chatId", deleteChat);
privateChatRouter.put("/:chatId", editChat);
privateChatRouter.post("/invite", inviteUserToChat);

export default privateChatRouter;
