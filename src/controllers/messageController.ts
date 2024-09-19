import { Request, Response } from "express";
import logger from "../config/logger";
import * as messageService from "../services/messageService.ts";

export const createMessage = async (req: Request, res: Response) => {
  const {
    text,
    chatId,
    creatorId,
    repliedMessageId,
    forwardedChatId,
    forwardedFromUserId,
  } = req.body;

  if (!text || !chatId || !creatorId) {
    logger.warn(
      "Text, chatId, and creatorId are required to create a message."
    );
    return res.status(400).json({
      success: false,
      code: 400,
      message: "Text, chatId, and creatorId are required.",
    });
  }

  try {
    const result = await messageService.createMessage(
      text,
      chatId,
      creatorId,
      repliedMessageId,
      forwardedChatId,
      forwardedFromUserId
    );
    res.status(201).json({ success: true, code: 201, data: result });
  } catch (err) {
    logger.error("Error creating message: ", err);
    res
      .status(500)
      .json({ success: false, code: 500, message: "Server error." });
  }
};

export const getMessageById = async (req: Request, res: Response) => {
  const { messageId } = req.params;

  try {
    const message = await messageService.getMessageById(Number(messageId));
    if (!message) {
      return res
        .status(404)
        .json({ success: false, code: 404, message: "Message not found." });
    }
    res.status(200).json({ success: true, code: 200, data: message });
  } catch (err) {
    logger.error("Error retrieving message: ", err);
    res
      .status(500)
      .json({ success: false, code: 500, message: "Server error." });
  }
};

export const updateMessage = async (req: Request, res: Response) => {
  const { messageId } = req.params;
  const { text } = req.body;

  if (!text) {
    logger.warn("Text is required to update the message.");
    return res
      .status(400)
      .json({ success: false, code: 400, message: "Text is required." });
  }

  try {
    const result = await messageService.updateMessage(Number(messageId), text);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, code: 404, message: "Message not found." });
    }

    res.status(200).json({
      success: true,
      code: 200,
      message: "Message updated successfully.",
    });
  } catch (err) {
    logger.error("Error updating message: ", err);
    res
      .status(500)
      .json({ success: false, code: 500, message: "Server error." });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  const { messageId } = req.params;

  try {
    const result = await messageService.deleteMessage(Number(messageId));
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, code: 404, message: "Message not found." });
    }
    res.status(200).json({
      success: true,
      code: 200,
      message: "Message deleted successfully.",
    });
  } catch (err) {
    logger.error("Error deleting message: ", err);
    res
      .status(500)
      .json({ success: false, code: 500, message: "Server error." });
  }
};

export const getMessagesByChatId = async (req: Request, res: Response) => {
  const { chatId } = req.params;
  const { page = 1, limit = 10, search = null } = req.query;

  const pageNumber = Math.max(Number(page), 1);
  const limitNumber = Math.max(Number(limit), 1);
  const offset = (pageNumber - 1) * limitNumber;

  try {
    const { messages, total } = await messageService.getMessagesByChatId(
      Number(chatId),
      search,
      limitNumber,
      offset
    );

    const totalPages = Math.ceil(total / limitNumber);

    res.status(200).json({
      success: true,
      code: 200,
      data: {
        messages,
        pagination: {
          total,
          totalPages,
          currentPage: pageNumber,
          limit: limitNumber,
        },
      },
    });
  } catch (err) {
    logger.error("Error retrieving messages for chat: ", err);
    res
      .status(500)
      .json({ success: false, code: 500, message: "Server error." });
  }
};

export const forwardMessage = async (req: Request, res: Response) => {
    const { messageId, targetChatId, forwarderId } = req.body;
  
    if (!messageId || !targetChatId || !forwarderId) {
      logger.warn("Message ID, target chat ID, and forwarder ID are required.");
      return res.status(400).json({
        success: false,
        code: 400,
        message: "Message ID, target chat ID, and forwarder ID are required.",
      });
    }
  
    try {
      const result = await messageService.forwardMessage(
        messageId,
        targetChatId,
        forwarderId
      );
      res.status(200).json({
        success: true,
        code: 200,
        message: "Message forwarded successfully.",
        data: result,
      });
    } catch (err) {
      logger.error("Error forwarding message: ", err);
      res
        .status(500)
        .json({ success: false, code: 500, message: "Server error." });
    }
  };