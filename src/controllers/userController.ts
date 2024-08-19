import { Request, Response } from "express";

export const getUser = (req: Request, res: Response) => {
  res.send("GET request to /user");
};

export const createUser = (req: Request, res: Response) => {
  const user = req.body;

  res.send(`User created: ${JSON.stringify(user)}`);
};

export const updateUser = (req: Request, res: Response) => {
  const userId = req.params.id;
  const updatedData = req.body;

  res.send(
    `User with ID ${userId} updated with data: ${JSON.stringify(updatedData)}`
  );
};
