import { Request, Response } from "express";
import logger from "../config/logger.ts";
import * as chatService from "../services/chatService.ts";
import { asyncHandler } from "../middleware/errorHandler.ts";

// Create a new chat
export const createChat = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user.id;
  const { title } = req.body;

  if (!title || !userId) {
    logger.warn("Title and creator ID are required for creating a chat.");
    throw { message: "Title and creator ID are required.", statusCode: 400 };
  }

  await chatService.createChat(title, userId);
  res.status(201).json({
    success: true,
    code: 201,
    data: { message: "Chat created successfully." },
  });
});

// Delete a chat
export const deleteChat = asyncHandler(async (req: Request, res: Response) => {
  const { chatId } = req.params;

  await chatService.deleteChat(Number(chatId));
  res.status(200).json({
    success: true,
    code: 200,
    data: { message: "Chat deleted successfully." },
  });
});

// Edit a chat
export const editChat = asyncHandler(async (req: Request, res: Response) => {
  const { chatId } = req.params;
  const { title } = req.body;

  if (!title) {
    logger.warn("New chat title is required.");
    throw { message: "New chat title is required.", statusCode: 400 };
  }

  await chatService.editChat(Number(chatId), title);
  res.status(200).json({
    success: true,
    code: 200,
    data: { message: "Chat updated successfully." },
  });
});

// Invite a user to chat
export const inviteUserToChat = asyncHandler(
  async (req: Request, res: Response) => {
    const { chatId, userId } = req.body;

    if (!chatId || !userId) {
      logger.warn("Chat ID and user ID are required to invite a user.");
      throw { message: "Chat ID and user ID are required.", statusCode: 400 };
    }

    await chatService.inviteUserToChat(Number(chatId), Number(userId));
    res.status(200).json({
      success: true,
      code: 200,
      data: { message: "User invited to chat successfully." },
    });
  }
);

export const getUsersChats = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user.id;

  if (!userId) {
    logger.warn("User ID is required to fetch chats.");
    throw { message: "User ID is required.", statusCode: 400 };
  }

  const chats = await chatService.getUsersChats(userId);
  res.status(200).json({
    success: true,
    code: 200,
    data: { chats },
  });
});