import * as jwt from "jsonwebtoken";
import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { SECRET } from "@/config/secret";
import { JwtData } from "./user.interface";

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    // if route is protected, there is a user set in auth.middleware
    if (!!req.user) {
      return !!data ? req.user[data] : req.user;
    }

    // in case a route is not protected, we still want to get the optional auth user from jwt
    const token = req.headers.authorization
      ? (req.headers.authorization as string).split(" ")[1]
      : null;
    if (!token) return;
    try {
      const decoded = jwt.verify(token, SECRET) as JwtData;
      return !!data ? decoded[data] : decoded.user;
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }
  },
);
