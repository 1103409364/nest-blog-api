import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export interface UserData {
  username: string;
  email: string;
  token: string;
  bio: string;
  image?: string;
  following?: boolean;
}

export interface UserRO {
  user: UserData;
}

export interface JwtData extends JwtPayload {
  id: number;
  username: string;
  email: string;
}

export interface UserReq extends Request {
  user: UserData;
}
