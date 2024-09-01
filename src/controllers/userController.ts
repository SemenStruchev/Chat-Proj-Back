import { Request, Response } from "express";
import connection from "../config/dbconfig.ts";
import { ResultSetHeader } from "mysql2";
import { updateUserQuery } from "../queries/userQueries.ts";

export const getUser = (req: Request, res: Response) => {
  res.send("GET request to /user");
};

export const createUser = (req: Request, res: Response) => {
  const user = req.body;

  res.send(`User created: ${JSON.stringify(user)}`);
};

// Edit user
export const updateUser = async (req: any, res: Response) => {
  const userId = req.user.id;
  const { firstName, lastName } = req.body;

  if (!firstName || !lastName) {
    return res.status(400).json({ message: "No data provided to update." });
  }

  try {
    const [rows] = await connection.query<ResultSetHeader>(updateUserQuery, [
      firstName,
      lastName,
      userId,
    ]);

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({ message: "User updated successfully." });
  } catch (err) {
    console.error("Update user error: ", err);
    return res.status(500).json({ message: "Server Error" });
  }
};
