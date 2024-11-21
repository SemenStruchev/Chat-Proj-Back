import { Request, Response } from "express";
import * as userService from "../services/userService.ts";
import logger from "../config/logger.ts";
import { asyncHandler } from "../middleware/errorHandler.ts";

// Get user
export const getUser = (req: Request, res: Response) => {
  res.send("GET request to /user");
};

// Create user
export const createUser = (req: Request, res: Response) => {
  const user = req.body;
  res.send(`User created: ${JSON.stringify(user)}`);
};

// Edit user
export const updateUser = asyncHandler(async (req: any, res: Response) => {
  const userId = req?.user?.id ?? "";
  const { firstName, lastName } = req.body;

  if (!firstName || !lastName) {
    logger.warn("No data provided to update.");
    throw { message: "No data provided to update.", statusCode: 400 };
  }

  try {
    await userService.updateUser(userId, firstName, lastName);
    logger.info(`User with ID ${userId} updated successfully.`);

    res.status(200).json({
      success: true,
      code: 200,
      data: { message: "User updated successfully." },
    });
  } catch (err: any) {
    if (err.message === "User not found") {
      logger.warn(`User with ID ${userId} not found.`);
      throw { message: "User not found.", statusCode: 404 };
    }

    logger.error("Update user error: ", err);
    throw { message: "Server Error", statusCode: 500 };
  }
});
