import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken'

@Injectable()
export class VerifyTokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    let secretKey = process.env.JWT_SECRET 
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ 
            data: null,
            statusCode: 401,
            message: 'Unauthorized' 
        });
    }
    jwt.verify(token, String(secretKey), (err, decoded) => {
      if (err) {
        return res.status(401).json({ 
          data: null,
          statusCode: 401,
          message: 'Invalid token'
        });
      }
    });
    next();
  }
}