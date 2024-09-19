import connection from "../config/dbconfig.ts";
import {
  createMessageQuery,
  getMessageByIdQuery,
  updateMessageQuery,
  deleteMessageQuery,
  getMessagesByChatIdQuery,
  countMessagesByChatIdQuery,
  forwardMessageQuery,
} from "../queries/messageQueries.ts";

// Create a new message
export const createMessage = async (
  text: string,
  chatId: number,
  creatorId: number,
  repliedMessageId: number | null = null,
  forwardedChatId: number | null = null,
  forwardedFromUserId: number | null = null
) => {
  const [result] = await connection.query(createMessageQuery, [
    text,
    chatId,
    creatorId,
    repliedMessageId,
    forwardedChatId,
    forwardedFromUserId,
  ]);
  return result;
};

export const getMessageById = async (id: number) => {
  const [rows] = await connection.query(getMessageByIdQuery, [id]);
  return rows[0];
};

export const updateMessage = async (id: number, text: string) => {
  const [result] = await connection.query(updateMessageQuery, [text, id]);
  return result;
};

export const deleteMessage = async (id: number) => {
  const [result] = await connection.query(deleteMessageQuery, [id]);
  return result;
};

export const getMessagesByChatId = async (
  chatId: number,
  search: string | null,
  limit: number,
  offset: number
) => {
  const searchTerm = search ? `%${search}%` : null;

  const [messages] = await connection.query(getMessagesByChatIdQuery, [
    chatId,
    searchTerm,
    searchTerm,
    limit,
    offset,
  ]);

  const [[{ total }]] = await connection.query(countMessagesByChatIdQuery, [
    chatId,
    searchTerm,
    searchTerm,
  ]);

  return { messages, total };
};

export const forwardMessage = async (
  messageId: number,
  targetChatId: number,
  forwarderId: number
) => {
  try {
    const [result] = await connection.query(forwardMessageQuery, [
      targetChatId,
      forwarderId,
      messageId,
    ]);

    if (result.affectedRows === 0) {
      throw new Error("Message forwarding failed.");
    }

    return result;
  } catch (error) {
    console.error("Error forwarding message: ", error);
    throw new Error("Failed to forward message.");
  }
};
