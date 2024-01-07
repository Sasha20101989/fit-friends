import { NextFunction, Request, Response } from 'express';

import type{ MiddlewareInterface } from './types/middleware.interface.js';
import type{ UserServiceInterface } from '../../modules/user/user-service.interface.js';
import { ExceptionFilter } from '../exception-filter/exception-filter.interface.js';
import { UserNotFoundException } from '../exception-filter/user-not-found.exception.js';


export class UserExistsByEmailMiddleware implements MiddlewareInterface {
  constructor(
    private readonly authExceptionFilter: ExceptionFilter,
    private readonly userService: UserServiceInterface
  ) {}


  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email } = req.body;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return next(this.authExceptionFilter.catch(new UserNotFoundException(), req, res, next));
    }

    next();
  }
}
