import connection from "../config/dbconfig.ts";

export const createMigrationsTable = async () => {
  const createMigrationsQuery = `
  CREATE TABLE IF NOT EXISTS Migrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    run_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

  try {
    await connection.query(createMigrationsQuery);
    console.log("Migrations table created.");
  } catch (err) {
    console.error("Migrations table creation caused error:", err);
  }
};
