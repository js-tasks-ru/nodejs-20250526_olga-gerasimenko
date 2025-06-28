import { Response } from 'express';
import { ArgumentsHost, ExceptionFilter, Catch, HttpException } from '@nestjs/common';
import { appendFileSync } from 'fs';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusCode = exception instanceof HttpException 
      ? exception.getStatus() 
      : 500;

    const message = exception instanceof HttpException 
      ? exception.message 
      : (exception as Error).message;

    const timestamp = new Date().toISOString();
    const cleanMessage = message.replace(/\n/g, ' ').trim();
    const logEntry = `[${timestamp}] ${statusCode} - ${cleanMessage}\n`;
    
    appendFileSync('errors.log', logEntry);

    response.status(statusCode).json({
      statusCode,
      message,
      timestamp,
    });
  }
}
