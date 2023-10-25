import { inject, injectable } from 'inversify';
import * as core from 'express-serve-static-core';

import type { LoggerInterface } from '../../core/logger/logger.interface.js';
import type { ConfigInterface } from '../../core/config/config.interface.js';
import { Controller } from '../../core/controller/controller.abstract.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import { FriendServiceInterface } from './friend-service.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { Request, Response } from 'express';
import { Role } from '../../types/role.enum.js';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../../core/errors/http-error.js';
import UserRdo from '../user/rdo/user.rdo.js';
import { fillDTO } from '../../core/helpers/index.js';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';
import CreateFriendDto from './dto/create-friend.dto.js';
import { UnknownRecord } from '../../types/unknown-record.type.js';
import { PrivateRouteMiddleware } from '../../core/middlewares/private-route.middleware.js';
import { ValidateObjectIdMiddleware } from '../../core/middlewares/validate-object-id.middleware.js';
import { DocumentExistsMiddleware } from '../../core/middlewares/document-exists.middleware.js';
import { UserServiceInterface } from '../user/user-service.interface.js';
import { ParamsGetFriend } from '../../types/params-get-friend.js';

@injectable()
export default class FriendController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.FriendServiceInterface) private readonly friendService: FriendServiceInterface,
    @inject(AppComponent.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(AppComponent.ConfigInterface) configService: ConfigInterface<RestSchema>
  ) {
    super(logger, configService);
    this.logger.info('Register routes for FriendController...');

    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create, middlewares: [new PrivateRouteMiddleware(), new ValidateDtoMiddleware(CreateFriendDto)] });
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index, middlewares: [new PrivateRouteMiddleware()] });
    this.addRoute({ path: '/:friendId', method: HttpMethod.Delete, handler: this.delete, middlewares: [new PrivateRouteMiddleware(), new ValidateObjectIdMiddleware('friendId'), new DocumentExistsMiddleware(this.userService, 'User', 'friendId')] });
  }

  public async delete(
    {params, user}: Request<core.ParamsDictionary | ParamsGetFriend>,
    res: Response
  ): Promise<void> {
    if(!user){
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

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
    { user, body }: Request<UnknownRecord, UnknownRecord, CreateFriendDto>,
    res: Response
  ): Promise<void> {

    if(!user){
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    const { friendId } = body;

    if (user.role !== Role.User) {
      throw new HttpError(
          StatusCodes.BAD_REQUEST,
          'Access denied: You do not have the required role to perform this action.',
          'FriendController'
      );
    }

    if(await this.friendService.exists(user.id, friendId)){
      throw new HttpError(
        StatusCodes.CONFLICT,
        `Friend with id ${friendId} exists.`,
        'FriendController'
      );
    }

    const result = await this.friendService.create(user.id, friendId);

    this.created(res, fillDTO(UserRdo, result));
  }

  public async index(
    req: Request,
    res: Response
  ): Promise<void> {
    if(!req.user){
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    if(req.user.role != Role.User){
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Access denied: You do not have the required role to perform this action.',
        'UserController'
      );
    }

    const friends = await this.friendService.getFriends(req.user.id);

    this.created(res, fillDTO(UserRdo, friends));
  }
}
