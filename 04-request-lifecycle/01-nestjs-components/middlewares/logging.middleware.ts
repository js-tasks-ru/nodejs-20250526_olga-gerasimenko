import { NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;

    console.log(`[${method}] ${originalUrl}`);
    next();
  }
}
