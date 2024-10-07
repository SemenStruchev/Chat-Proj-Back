import connection from "../config/dbconfig.ts";
import {
  createChatQuery,
  deleteChatQuery,
  updateChatQuery,
  inviteUserQuery,
  getUserChatsQuery,
  countUserChatsQuery,
} from "../queries/chatQueries.ts";
import logger from "../config/logger.ts";

export const createChat = async (
  title: string,
  creatorId: number
): Promise<void> => {
  await connection.query(createChatQuery, [title, creatorId]);
  logger.info("Chat created successfully.");
};

export const deleteChat = async (chatId: number): Promise<void> => {
  await connection.query(deleteChatQuery, [chatId]);
  logger.info(`Chat with ID ${chatId} deleted successfully.`);
};

export const editChat = async (
  chatId: number,
  title: string
): Promise<void> => {
  await connection.query(updateChatQuery, [title, chatId]);
  logger.info(`Chat with ID ${chatId} updated successfully.`);
};

export const inviteUserToChat = async (
  chatId: number,
  userId: number
): Promise<void> => {
  await connection.query(inviteUserQuery, [chatId, userId]);
  logger.info(`User with ID ${userId} invited to chat with ID ${chatId}.`);
};

export const getUsersChats = async (
  userId: number,
  search: string,
  sort: string,
  order: string,
  limit: number,
  offset: number
) => {
  const searchQuery = `%${search}%`; // To perform a partial match for search

  const [chats] = await connection.query(getUserChatsQuery, [
    userId,
    searchQuery,
    limit,
    offset,
  ]);

  const [[{ total }]]: any = await connection.query(countUserChatsQuery, [
    userId,
    searchQuery,
  ]);

  return { chats, total };
};
