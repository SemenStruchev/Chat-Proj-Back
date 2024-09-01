import connection from "../config/dbconfig.ts";

export const createTokensTable = async () => {
  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS Tokens (
          id INT AUTO_INCREMENT PRIMARY KEY,
          userId INT NOT NULL,
          accessToken VARCHAR(255) NOT NULL,
          refreshToken VARCHAR(255) NOT NULL,
          expiresAt TIMESTAMP NOT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
        );
      `;

  try {
    await connection.query(createTableQuery);
    console.log("Tokens table created.");
  } catch (err) {
    console.error("Tokens table creation caused error:", err);
  }
};
