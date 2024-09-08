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
