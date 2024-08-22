import { createChatsTable } from "./chats.ts";
import { createMessagesTable } from "./messages.ts";
import { createUsersTable } from "./users.ts";
import { createUsersChatsTable } from "./usersChats.ts";

export const initializeTables = async () => {
  await createUsersTable();
  await createChatsTable();
  await createMessagesTable();
  await createUsersChatsTable();
};
