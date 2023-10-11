import {NextFunction, Request, Response} from 'express';

import type {MiddlewareInterface} from './middleware.interface.js';
import {HttpMethod} from './http-method.enum.js';

export interface RouteInterface {
  path: string;
  method: HttpMethod;
  handler: (req: Request, res: Response, next: NextFunction) => void;
  middlewares?: MiddlewareInterface[];
}
