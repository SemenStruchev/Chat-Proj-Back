import dotenv from "dotenv";
import { Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import connection from "../config/dbconfig.ts";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";

export const verifyToken = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers["authorization"];
  const refreshToken = req.headers["authorizationx-refresh-token"] as string;
  let token = authorizationHeader?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No jwt token" });
  }

  try {
    // Verify access token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err: any) {
    // If access token is expired, handle token refresh
    if (err.name === "TokenExpiredError" && refreshToken) {
      try {
        const decodedRefresh = jwt.verify(
          refreshToken,
          REFRESH_TOKEN_SECRET
        ) as JwtPayload;

        // Fetch the user associated with the refresh token
        const query = `
          SELECT * FROM Tokens
          WHERE userId = ? AND refreshToken = ? AND expiresAt > NOW()
        `;

        const [rows]: any = await connection.query(query, [
          decodedRefresh.id,
          refreshToken,
        ]);

        if (rows.length === 0) {
          return res
            .status(403)
            .json({ message: "Refresh token is invalid or expired" });
        }

        // Generate a new access token
        const newAccessToken = jwt.sign(
          { id: decodedRefresh.id, email: decodedRefresh.email },
          JWT_SECRET,
          { expiresIn: "1h" }
        );

        // Respond with the new access token
        res.setHeader("x-access-token", newAccessToken);
        req.user = decodedRefresh;
        next();
      } catch (refreshError) {
        return res.status(401).json({ message: "Invalid refresh token." });
      }
    } else {
      return res.status(401).json({ message: "Incorrect jwt token" });
    }
  }
};
