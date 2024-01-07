import { NextFunction, Request, Response } from 'express';
import { MiddlewareInterface } from './types/middleware.interface.js';
import { AuthException } from '../exception-filter/auth.exception.js';
import { ExceptionFilter } from '../exception-filter/exception-filter.interface.js';

export class PrivateRouteMiddleware implements MiddlewareInterface {
  constructor(
    private readonly authExceptionFilter: ExceptionFilter
  ) {}

  public async execute(_req: Request, _res: Response, next: NextFunction): Promise<void> {
    const { user } = _req;
    if (!user) {
      return next(this.authExceptionFilter.catch(new AuthException('UNAUTHORIZED'), _req, _res, next));
    }

    return next();
  }
}
