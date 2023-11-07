import { inject, injectable } from 'inversify';
import * as core from 'express-serve-static-core';

import type { LoggerInterface } from '../../core/logger/logger.interface.js';
import type { ConfigInterface } from '../../core/config/config.interface.js';
import { Controller } from '../../core/controller/controller.abstract.js';
import { AppComponent } from '../../types/common/app-component.enum.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import { FriendServiceInterface } from './friend-service.interface.js';
import { HttpMethod } from '../../types/common/http-method.enum.js';
import { Request, Response } from 'express';
import { Role } from '../../types/role.enum.js';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../../core/errors/http-error.js';
import UserRdo from '../user/rdo/user.rdo.js';
import { fillDTO } from '../../core/helpers/index.js';
import { PrivateRouteMiddleware } from '../../core/middlewares/private-route.middleware.js';
import { ValidateObjectIdMiddleware } from '../../core/middlewares/validate-object-id.middleware.js';
import { DocumentExistsMiddleware } from '../../core/middlewares/document-exists.middleware.js';
import { UserServiceInterface } from '../user/user-service.interface.js';
import { ParamsGetFriend } from '../../types/params/params-get-friend.type.js';
import { RoleCheckMiddleware } from '../../core/middlewares/role-check.middleware.js';
import { NotificationServiceInterface } from '../notification/notification-service.interface.js';
import { UnknownRecord } from '../../types/common/unknown-record.type.js';
import { FriendQueryParams } from './types/friend-query-params.js';
import { RequestType } from '../request/types/request-type.enum.js';

@injectable()
export default class FriendController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.FriendServiceInterface) private readonly friendService: FriendServiceInterface,
    @inject(AppComponent.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(AppComponent.NotificationServiceInterface) private readonly notificationService: NotificationServiceInterface,
    @inject(AppComponent.ConfigInterface) configService: ConfigInterface<RestSchema>
  ) {
    super(logger, configService);
    this.logger.info('Register routes for FriendController...');

    this.addRoute({ path: '/:friendId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new RoleCheckMiddleware(Role.User),
        new ValidateObjectIdMiddleware('friendId'),
        new DocumentExistsMiddleware(this.userService, 'User', 'friendId')
      ]
    });
    this.addRoute({ path: '/',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new PrivateRouteMiddleware()
      ]
    });
    this.addRoute({ path: '/:friendId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new RoleCheckMiddleware(Role.User),
        new ValidateObjectIdMiddleware('friendId'),
        new DocumentExistsMiddleware(this.userService, 'User', 'friendId')
      ]
    });
  }

  public async delete(
    {params, user}: Request<core.ParamsDictionary | ParamsGetFriend>,
    res: Response
  ): Promise<void> {
    const {friendId} = params;

    if(!await this.friendService.exists(user.id, friendId)){
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Friend with id ${friendId} not exists.`,
        'FriendController'
      );
    }

    await this.friendService.delete(user.id, friendId);

    this.ok(res, { message: 'Friend deleted' });
  }

  public async create(
    {params, user}: Request<core.ParamsDictionary | ParamsGetFriend>,
    res: Response
  ): Promise<void> {
    const { friendId } = params;

    const existingUser = await this.friendService.findById(user.id);

    if(!existingUser){
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `User with email ${user.email} not found.`,
        'FriendController'
      );
    }

    if(await this.friendService.exists(user.id, friendId)){
      throw new HttpError(
        StatusCodes.CONFLICT,
        `Friend with id ${friendId} exists in friend list.`,
        'FriendController'
      );
    }

    const result = await this.friendService.create(user.id, friendId);

    this.created(res, fillDTO(UserRdo, result));

    await this.notificationService.createNotification(friendId, RequestType.Friend);
  }

  public async index(
    { query, user }: Request<core.ParamsDictionary, UnknownRecord, FriendQueryParams>,
    res: Response
  ): Promise<void> {
    const friends = await this.friendService.find(user.id, query);

    this.ok(res, fillDTO(UserRdo, friends));
  }
}
