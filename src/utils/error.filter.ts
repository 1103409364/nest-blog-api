import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface ErrorResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
  stack?: string;
  errors?: Array<Record<string, string>>;
}

@Catch() //装饰器传 HttpException 只处理 http 异常，不传可以处理所有异常
export class ErrorFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger('ErrorFilter');

  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const statusCode =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const errorResponse: ErrorResponse = {
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: error.message,
    };
    errorResponse.errors = (error as any)?.response?.errors;
    // 未知异常返回 stack
    if (statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      errorResponse.stack = error.stack;
    }

    this.logger.error({ message: [error.message, error.stack].join('\n') });

    response.status(statusCode).json(errorResponse);
  }
}
