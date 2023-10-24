import { inject, injectable } from 'inversify';

import type { LoggerInterface } from '../../core/logger/logger.interface.js';
import type { ConfigInterface } from '../../core/config/config.interface.js';
import { Controller } from '../../core/controller/controller.abstract.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import { FriendServiceInterface } from './friend-service.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';
import CreateFriendDto from './dto/create-friend.dto.js';
import { Request, Response } from 'express';
import { UnknownRecord } from '../../types/unknown-record.type.js';
import { Role } from '../../types/role.enum.js';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../../core/errors/http-error.js';
import UserRdo from '../user/rdo/user.rdo.js';
import { fillDTO } from '../../core/helpers/index.js';

@injectable()
export default class FriendController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.FriendServiceInterface) private readonly friendService: FriendServiceInterface,
    @inject(AppComponent.ConfigInterface) configService: ConfigInterface<RestSchema>
  ) {
    super(logger, configService);
    this.logger.info('Register routes for FriendController...');

    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create, middlewares: [new ValidateDtoMiddleware(CreateFriendDto)] });
  }

  public async create(
    { body, user }: Request<UnknownRecord, UnknownRecord, CreateFriendDto>,
    res: Response
  ): Promise<void> {

    if (user.role !== Role.User) {
      throw new HttpError(
          StatusCodes.BAD_REQUEST,
          'Access denied: You do not have the required role to perform this action.',
          'TrainingController'
      );
    }

    // if (!await this.friendService.exists(user.id)) {
    //   throw new HttpError(
    //     StatusCodes.NOT_FOUND,
    //     `Trainer with id ${user.id} not found.`,
    //     'TrainingController'
    //   );
    // }

    const result = await this.friendService.create({...body, user: user.id});

    this.created(res, fillDTO(UserRdo, result));
  }
}
