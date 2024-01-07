import { inject, injectable } from 'inversify';
import * as core from 'express-serve-static-core';
import { Request, Response } from 'express';

import type { LoggerInterface } from '../../core/logger/logger.interface.js';
import type { SubscriberServiceInterface } from './subscriber-service.interface.js';
import type { ConfigInterface } from '../../core/config/config.interface.js';
import { Controller } from '../../core/controller/controller.abstract.js';
import { AppComponent } from '../../types/common/app-component.enum.js';
import { HttpMethod } from '../../types/common/http-method.enum.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import { fillDTO } from '../../core/helpers/index.js';
import SubscriberRdo from './rdo/subscriber.rdo.js';
import { ValidateObjectIdMiddleware } from '../../core/middlewares/validate-object-id.middleware.js';
import { DocumentExistsMiddleware } from '../../core/middlewares/document-exists.middleware.js';
import { PrivateRouteMiddleware } from '../../core/middlewares/private-route.middleware.js';
import { UserServiceInterface } from '../user/user-service.interface.js';
import { ParamsGetTrainer } from '../../types/params/params-get-trainer.type.js';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../../core/errors/http-error.js';
import { AuthExceptionFilter } from '../../core/exception-filter/auth.exception-filter.js';

@injectable()
export default class SubscriberController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.SubscriberServiceInterface) private readonly subscriberService: SubscriberServiceInterface,
    @inject(AppComponent.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(AppComponent.ConfigInterface) configService: ConfigInterface<RestSchema>,
    @inject(AppComponent.AuthExceptionFilter) private readonly authExceptionFilter: AuthExceptionFilter
  ) {
    super(logger, configService);
    this.logger.info('Register routes for SubscriberController...');

    this.addRoute({ path: '/trainer/:trainerId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(this.authExceptionFilter),
        new ValidateObjectIdMiddleware('trainerId'),
        new DocumentExistsMiddleware(this.userService, 'Traininer', 'trainerId')
      ]
    });
    this.addRoute({ path: '/trainer/:trainerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(this.authExceptionFilter),
        new ValidateObjectIdMiddleware('trainerId'),
        new DocumentExistsMiddleware(this.userService, 'Traininer', 'trainerId')
      ]
    });
    this.addRoute({ path: '/',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new PrivateRouteMiddleware(this.authExceptionFilter)
      ]
    });
  }

  public async index(
    { user }: Request,
    res: Response
  ) {
    const subscribes = await this.subscriberService.findByUserId(user.id);

    this.ok(res, fillDTO(SubscriberRdo, subscribes));
  }

  public async create(
    { params, user }: Request<core.ParamsDictionary | ParamsGetTrainer>,
    res: Response
  ): Promise<void> {
    const { trainerId } = params;

    if(await this.subscriberService.exists(user.id, trainerId)){
      throw new HttpError(
        StatusCodes.CONFLICT,
        `Trainer with id ${ trainerId } exists in subscribes.`,
        'SubscriberController'
      );
    }

    const subscribe = await this.subscriberService.create(user.id, trainerId);
    this.created(res, fillDTO(SubscriberRdo, subscribe));
  }

  public async delete(
    {params, user}: Request<core.ParamsDictionary | ParamsGetTrainer>,
    res: Response
  ): Promise<void> {
    const { trainerId } = params;

    if(!await this.subscriberService.exists(user.id, trainerId)){
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Trainer with id ${ trainerId } not exists in subscribes.`,
        'SubscriberController'
      );
    }

    await this.subscriberService.destroy(user.id, trainerId);

    this.ok(res, { message: 'Subscribe fo trainer deleted' });
  }
}
