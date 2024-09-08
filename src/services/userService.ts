import connection from "../config/dbconfig.ts";
import { ResultSetHeader } from "mysql2";
import { updateUserQuery } from "../queries/userQueries.ts";

export const updateUser = async (
  userId: number,
  firstName: string,
  lastName: string
): Promise<void> => {
  const [rows] = await connection.query<ResultSetHeader>(updateUserQuery, [
    firstName,
    lastName,
    userId,
  ]);

  if (rows.affectedRows === 0) {
    throw new Error("User not found");
  }
};
