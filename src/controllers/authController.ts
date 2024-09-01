import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connection from "../config/dbconfig.ts";
import { FieldPacket } from "mysql2";
import {
  findUserByEmailQuery,
  insertOrUpdateTokenQuery,
  insertUserQuery,
} from "../queries/userQueries.ts";

// Register
export const register = async (req: Request, res: Response) => {
  const { username, email, password, firstName, lastName } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields should be filled in" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await connection.query(insertUserQuery, [
      username,
      email,
      hashedPassword,
      firstName,
      lastName,
    ]);

    return res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.error("Registration failed: ", err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields should be filled in" });
  }

  try {
    const [rows]: [Array<any>, FieldPacket[]] = await connection.query(
      findUserByEmailQuery,
      [email]
    );

    if (Array.isArray(rows) && rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Password or email is incorrect" });
    }

    const user = rows[0];

    const isPasswordValid = bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Password or email is incorrect" });
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email },
      "your_refresh_token_secret",
      { expiresIn: "7d" }
    );

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await connection.query(insertOrUpdateTokenQuery, [
      user.id,
      accessToken,
      refreshToken,
      expiresAt,
    ]);

    return res
      .status(200)
      .json({ message: "Logged in", accessToken, refreshToken });
  } catch (err) {
    console.error("Login error: ", err);
    return res.status(500).json({ message: "Server Error" });
  }
};
