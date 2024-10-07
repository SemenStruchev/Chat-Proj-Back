import { Response, Request } from "express";

declare module "express" {
  export interface Response {
    success: (data: any, message?: string, statusCode?: number) => void;
  }

  export interface Request {
    user?: User;
  }
}

declare module "express-serve-static-core" {
  export interface Response {
    success: (data: any, message?: string, statusCode?: number) => void;
  }
}

interface User {
  id: number;
  username: string;
}
