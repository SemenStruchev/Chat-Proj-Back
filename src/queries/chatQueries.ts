// Query to create a new chat
export const createChatQuery = `
  INSERT INTO Chats (title, creatorId) 
  VALUES (?, ?);
`;

// Query to delete a chat by ID
export const deleteChatQuery = `
  DELETE FROM Chats WHERE id = ?;
`;

// Query to update a chat's title by ID
export const updateChatQuery = `
  UPDATE Chats SET title = ? WHERE id = ?;
`;

// Query to invite a user to a chat
export const inviteUserQuery = `
  INSERT INTO UsersChats (chatId, userId)
  VALUES (?, ?);
`;
// Query to get a user chats
export const getUserChatsQuery = `
  SELECT c.*
  FROM Chats c
  INNER JOIN UsersChats uc ON c.id = uc.chatId
  WHERE uc.userId = ? 
  AND c.title LIKE ? 
  ORDER BY ?? ??
  LIMIT ? OFFSET ?
`;

export const countUserChatsQuery = `
  SELECT COUNT(*) AS total
  FROM Chats c
  INNER JOIN UsersChats uc ON c.id = uc.chatId
  WHERE uc.userId = ? 
  AND c.title LIKE ?
`;
