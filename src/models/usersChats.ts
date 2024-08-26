import connection from "../config/dbconfig.ts";

export const createUsersChatsTable = () => {
  const createUsersChatsTableQuery = `
    CREATE TABLE IF NOT EXISTS UsersChats (
      id INT AUTO_INCREMENT PRIMARY KEY,
      chatId INT NOT NULL,
      userId INT NOT NULL,
      FOREIGN KEY (chatId) REFERENCES Chats(id) ON DELETE CASCADE,
      FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
      UNIQUE (chatId, userId)
    );
  `;

  try {
    connection.query(createUsersChatsTableQuery);
    console.log("Users_Chats Table created.");
  } catch (err) {
    console.error("Users_Chats table creating caused error: ", err);
  }
};
