import { Request, Response } from 'express';
import connection from '../config/dbconfig';
import logger from '../config/logger';
import { createChatQuery, deleteChatQuery, updateChatQuery, inviteUserQuery } from '../queries/chatQueries';

// Create a new chat
export const createChat = async (req: Request, res: Response) => {
  const { title, creatorId } = req.body;

  if (!title || !creatorId) {
    logger.warn("Title and creator ID are required for creating a chat.");
    return res.status(400).json({ message: "Title and creator ID are required." });
  }

  try {
    await connection.query(createChatQuery, [title, creatorId]);
    logger.info("Chat created successfully.");
    res.status(201).json({ message: "Chat created successfully." });
  } catch (err) {
    logger.error("Error creating chat: ", err);
    res.status(500).json({ message: "Server error." });
  }
};

// Delete a chat
export const deleteChat = async (req: Request, res: Response) => {
  const { chatId } = req.params;

  try {
    await connection.query(deleteChatQuery, [chatId]);
    logger.info(`Chat with ID ${chatId} deleted successfully.`);
    res.status(200).json({ message: "Chat deleted successfully." });
  } catch (err) {
    logger.error("Error deleting chat: ", err);
    res.status(500).json({ message: "Server error." });
  }
};

// Edit a chat
export const editChat = async (req: Request, res: Response) => {
  const { chatId } = req.params;
  const { title } = req.body;

  if (!title) {
    logger.warn("New chat title is required.");
    return res.status(400).json({ message: "New chat title is required." });
  }

  try {
    await connection.query(updateChatQuery, [title, chatId]);
    logger.info(`Chat with ID ${chatId} updated successfully.`);
    res.status(200).json({ message: "Chat updated successfully." });
  } catch (err) {
    logger.error("Error updating chat: ", err);
    res.status(500).json({ message: "Server error." });
  }
};

// Invite a user to chat
export const inviteUserToChat = async (req: Request, res: Response) => {
  const { chatId, userId } = req.body;

  if (!chatId || !userId) {
    logger.warn("Chat ID and user ID are required to invite a user.");
    return res.status(400).json({ message: "Chat ID and user ID are required." });
  }

  try {
    await connection.query(inviteUserQuery, [chatId, userId]);
    logger.info(`User with ID ${userId} invited to chat with ID ${chatId}.`);
    res.status(200).json({ message: "User invited to chat successfully." });
  } catch (err) {
    logger.error("Error inviting user to chat: ", err);
    res.status(500).json({ message: "Server error." });
  }
};
