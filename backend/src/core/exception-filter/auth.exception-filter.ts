import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { AppComponent } from '../../types/common/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { BaseUserException } from './base-user.exception.js';
import { ExceptionFilter } from '../../core/exception-filter/exception-filter.interface.js';

@injectable()
export class AuthExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface
  ) {
    this.logger.info('Register AuthExceptionFilter');
  }

  public catch(error: unknown, _req: Request, res: Response, next: NextFunction): void {
    if (! (error instanceof BaseUserException)) {
      return next(error);
    }

    this.logger.error(`[UserModule] ${error.message}`, error);
    res.status(error.status)
      .json({
        type: 'AUTHORIZATION',
        error: error.message,
      });
  }
}
