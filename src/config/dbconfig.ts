import { createConnection } from "mysql2";

const dbConfig = {
  host: "localhost",
  user: "chatuser",
  password: "Fishki123!",
  database: "Chatapp",
};

const connection = createConnection(dbConfig);

export default connection;
