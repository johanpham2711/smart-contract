import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { IResponse } from '../../interfaces';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status === 500) {
      return response.status(status).json({
        success: false,
        message: 'Internal Server Error',
        errors: exception?.message ?? exception.stack,
        code: response.statusCode,
      } as IResponse);
    }

    const exceptionResponse = exception.getResponse() as any;
    response.status(status).json({
      success: false,
      message: exception.message,
      errors: exceptionResponse.message ?? exceptionResponse,
      code: response.statusCode,
    } as IResponse);
  }
}
