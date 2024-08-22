import connection from "../config/dbconfig.ts";

export const createChatsTable = () => {
  const createChatsTableQuery = `
    CREATE TABLE IF NOT EXISTS Chats (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      creatorId INT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (creatorId) REFERENCES Users(id) ON DELETE CASCADE
    );
    `;

  try {
    connection.query(createChatsTableQuery);
    console.log("Chats Table created.");
  } catch (err) {
    console.error("Chats table creating caused error: ", err);
  }
};
