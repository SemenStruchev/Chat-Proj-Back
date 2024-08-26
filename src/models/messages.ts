import connection from "../config/dbconfig.ts";

export const createMessagesTable = () => {
  const createMessagesTableQuery = `
    CREATE TABLE IF NOT EXISTS Messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      text TEXT NOT NULL,
      chatId INT NOT NULL,
      creatorId INT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      repliedMessageId INT DEFAULT NULL,
      status TINYINT(1) DEFAULT 1, -- 1 - active, 0 - deleted
      forwardedChatId INT DEFAULT NULL,
      forwardedFromUserId INT DEFAULT NULL,
      FOREIGN KEY (chatId) REFERENCES Chats(id) ON DELETE CASCADE,
      FOREIGN KEY (creatorId) REFERENCES Users(id) ON DELETE CASCADE,
      FOREIGN KEY (repliedMessageId) REFERENCES Messages(id) ON DELETE SET NULL,
      FOREIGN KEY (forwardedChatId) REFERENCES Chats(id) ON DELETE SET NULL,
      FOREIGN KEY (forwardedFromUserId) REFERENCES Users(id) ON DELETE SET NULL
    );
  `;

  try {
    connection.query(createMessagesTableQuery);
    console.log("Messages Table created.");
  } catch (err) {
    console.error("Messages table creating caused error: ", err);
  }
};
