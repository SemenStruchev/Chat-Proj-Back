import { Router } from "express";
import * as messageController from "../../controllers/messageController.ts";

const privateMessagesRouter = Router();

// Route to get messages by chat ID with pagination and search
privateMessagesRouter.get("/:chatId", messageController.getMessagesByChatId);

// Route to create a new message
privateMessagesRouter.post("", messageController.createMessage);

// Route to edit a message
privateMessagesRouter.put("/:messageId", messageController.updateMessage);

// Route to delete a message
privateMessagesRouter.delete("/:messageId", messageController.deleteMessage);

// Route to forward a message
privateMessagesRouter.post("/forward", messageController.forwardMessage);

export default privateMessagesRouter;