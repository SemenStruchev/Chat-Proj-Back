import { createChatsTable } from "../models/chats.ts";
import { createMessagesTable } from "../models/messages.ts";
import { createMigrationsTable } from "../models/migrations.ts";
import { createTokensTable } from "../models/tokens.ts";
import { createUsersTable } from "../models/users.ts";
import { createUsersChatsTable } from "../models/usersChats.ts";

export const initializeTables = async () => {
  await createUsersTable();
  await createChatsTable();
  await createMessagesTable();
  await createUsersChatsTable();
  await createTokensTable();
  await createMigrationsTable();
};

initializeTables()
  .then(() => {
    console.log("All tables have been initialized.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error initializing tables:", err);
    process.exit(1);
  });
