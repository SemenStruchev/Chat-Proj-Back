import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrationName = process.argv[2];

if (!migrationName) {
  console.error("Please provide a migration name.");
  process.exit(1);
}

const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, "");
const fileName = `${timestamp}_${migrationName}.js`;

// Path to the migrations directory
const migrationsDir = path.join(__dirname, "..", "migrations");

// Ensure the migrations directory exists
if (!fs.existsSync(migrationsDir)) {
  fs.mkdirSync(migrationsDir, { recursive: true }); // Creates the directory recursively
}

const filePath = path.join(migrationsDir, fileName);

// Template for the migration file
const template = `import connection from '../config/dbconfig.js';

export const up = async () => {
  // Write your 'up' migration logic here
  console.log('${fileName} migration UP');
};

export const down = async () => {
  // Write your 'down' migration logic here
  console.log('${fileName} migration DOWN');
};
`;

fs.writeFile(filePath, template, (err) => {
  if (err) {
    console.error("Error creating migration file:", err);
    process.exit(1);
  }

  console.log("Migration file created successfully:", fileName);
});
