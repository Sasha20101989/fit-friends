import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../errors/http-error.js';
import { MiddlewareInterface } from './types/middleware.interface.js';
import { Role } from '../../types/role.enum.js';

export class RoleCheckMiddleware implements MiddlewareInterface {
  constructor(private role: Role) {}

  public async execute(req: Request, _res: Response, next: NextFunction): Promise<void> {
    if(req.body.role){
      if (req.body.role !== this.role) {
        throw new HttpError(
          StatusCodes.FORBIDDEN,
          'Access denied: You do not have the required role to perform this action.',
          'RoleCheckMiddleware'
        );
      }
    }else{
      if (req.user.role !== this.role) {
        throw new HttpError(
          StatusCodes.FORBIDDEN,
          'Access denied: You do not have the required role to perform this action.',
          'RoleCheckMiddleware'
        );
      }
    }
    next();
  }
}
