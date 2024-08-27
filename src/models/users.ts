import connection from "../config/dbconfig.ts";

export const createUsersTable = async () => {
  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS Users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          firstName VARCHAR(255) NOT NULL,
          lastName VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;

  try {
    await connection.query(createTableQuery);
    console.log("Users Table created.");
  } catch (err) {
    console.error("Users table creating caused error: ", err);
  }
};
