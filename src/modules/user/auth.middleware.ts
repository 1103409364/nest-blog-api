import * as jwt from "jsonwebtoken";
import { HttpException } from "@nestjs/common/exceptions/http.exception";
import { NestMiddleware, HttpStatus, Injectable } from "@nestjs/common";
// import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request, Response, NextFunction } from "express";
import { SECRET } from "@/config/secret";
import { UserService } from "./user.service";
import { UserData } from "./user.interface";
interface UserReq extends Request {
  user: UserData;
}
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: UserReq, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;
    const token = authorization && (authorization as string).split(" ")[1];
    if (token) {
      const decoded = jwt.verify(token, SECRET);
      const { user } = await this.userService.findById(decoded.id);

      if (!user) {
        throw new HttpException("User not found.", HttpStatus.UNAUTHORIZED);
      }
      req.user = user;
      next();
    } else {
      throw new HttpException("Not authorized.", HttpStatus.UNAUTHORIZED);
    }
  }
}
