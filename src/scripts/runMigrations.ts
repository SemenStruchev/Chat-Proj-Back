import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrationsDir = path.join(__dirname, "..", "migrations");

// Function to execute all migrations
const runMigrations = async () => {
  try {
    const files = fs.readdirSync(migrationsDir);

    // Filter only .js files and sort them by timestamp
    const migrationFiles = files.filter((file) => file.endsWith(".js")).sort();

    console.log("Running migrations in order...");

    for (const file of migrationFiles) {
      const filePath = path.join(migrationsDir, file);
      const migration = await import(filePath); 

      if (typeof migration.up === "function") {
        console.log(`Running migration: ${file}`);
        await migration.up(); // Run the 'up' function for each migration
        console.log(`Migration completed: ${file}`);
      } else {
        console.warn(`Skipping migration file without 'up' function: ${file}`);
      }
    }

    console.log("All migrations completed successfully.");
  } catch (err) {
    console.error("Error running migrations:", err);
  }
};

// Execute the migration runner
runMigrations();
