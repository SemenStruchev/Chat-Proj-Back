export const createMessageQuery = `
  INSERT INTO Messages (
    text, chatId, creatorId, repliedMessageId, forwardedChatId, forwardedFromUserId
  ) VALUES (?, ?, ?, ?, ?, ?);
`;

export const getMessageByIdQuery = `
  SELECT * FROM Messages WHERE id = ? AND status = 1;
`;

export const updateMessageQuery = `
  UPDATE Messages 
  SET text = ?, updatedAt = CURRENT_TIMESTAMP 
  WHERE id = ? AND status = 1;
`;

export const deleteMessageQuery = `
  UPDATE Messages 
  SET status = 0, updatedAt = CURRENT_TIMESTAMP 
  WHERE id = ?;
`;

export const getMessagesByChatIdQuery = `
  SELECT * FROM Messages 
  WHERE chatId = ? AND status = 1
  AND (text LIKE ? OR ? IS NULL) -- Search text if provided
  ORDER BY createdAt ASC 
  LIMIT ? OFFSET ?;  -- Pagination
`;

export const countMessagesByChatIdQuery = `
  SELECT COUNT(*) AS total FROM Messages 
  WHERE chatId = ? AND status = 1 
  AND (text LIKE ? OR ? IS NULL);  -- Search text if provided
`;

export const forwardMessageQuery = `
  INSERT INTO Messages (text, chatId, creatorId, forwardedChatId, forwardedFromUserId)
  SELECT text, ?, ?, chatId, creatorId
  FROM Messages
  WHERE id = ?;
`;
