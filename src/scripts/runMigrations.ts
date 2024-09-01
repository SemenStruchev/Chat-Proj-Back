import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import connection from "../config/dbconfig.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrationsDir = path.join(__dirname, "..", "migrations");

// Function to check if a migration has already been run
const checkMigrationExists = async (
  migrationName: string,
  connection: any
): Promise<boolean> => {
  const checkQuery = `SELECT COUNT(*) AS count FROM Migrations WHERE name = ?`;

  try {
    const [results] = await connection.query(checkQuery, [migrationName]);
    return results[0].count > 0;
  } catch (err) {
    console.error("Error checking migration:", err);
    throw err;
  }
};

// Function to record a migration as run
const recordMigration = async (
  migrationName: string,
  connection: any
): Promise<void> => {
  const insertQuery = `INSERT INTO Migrations (name) VALUES (?)`;

  try {
    await connection.query(insertQuery, [migrationName]);
  } catch (err) {
    console.error("Error recording migration:", err);
    throw err;
  }
};

// Function to execute all migrations
const runMigrations = async () => {
  // Create a database connection

  try {
    // Create the Migrations table if it does not exist
    await connection.query(`
      CREATE TABLE IF NOT EXISTS Migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        run_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const files = fs.readdirSync(migrationsDir);
    const migrationFiles = files.filter((file) => file.endsWith(".js")).sort();

    console.log("Running migrations in order...");

    for (const file of migrationFiles) {
      if (await checkMigrationExists(file, connection)) {
        console.log(`Skipping already run migration: ${file}`);
        continue;
      }

      const filePath = path.join(migrationsDir, file);
      const migration = await import(filePath);

      if (typeof migration.up === "function") {
        console.log(`Running migration: ${file}`);
        await migration.up(connection); // Run the 'up' function from the migration file
        console.log(`Migration completed: ${file}`);
        await recordMigration(file, connection);
      } else {
        console.warn(`Skipping migration file without 'up' function: ${file}`);
      }
    }

    console.log("All migrations completed successfully.");
  } catch (err) {
    console.error("Error running migrations:", err);
  } finally {
    // Ensure the database connection is closed when finished
    await connection.end();
  }
};

// Execute the migration runner
runMigrations();
