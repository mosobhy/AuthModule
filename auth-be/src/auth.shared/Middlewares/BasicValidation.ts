import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class BasicValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    try {
      if(req.method == "POST" && (!req.body || !req.body.data)) {
        return res.json({
          data: null,
          statusCode: 400,
          message: "Invalid payload!"
        })
      }
    } 
    catch(err: unknown) {
      return res.json({
        data: null,
        statusCode: 400,
        message: "Invalid payload!"
      })

    }
    finally {
      next()
    }
  }
}