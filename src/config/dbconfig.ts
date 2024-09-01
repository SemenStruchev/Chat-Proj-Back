import { createConnection } from "mysql2/promise";

const dbConfig = {
  host: "localhost",
  user: "chatuser",
  password: "Fishki123!",
  database: "Chatapp",
};

const connection = await createConnection(dbConfig);

export default connection;
