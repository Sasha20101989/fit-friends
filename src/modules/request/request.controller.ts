import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';

import type { LoggerInterface } from '../../core/logger/logger.interface.js';
import type { RequestServiceInterface } from './request-service.interface.js';
import type { ConfigInterface } from '../../core/config/config.interface.js';
import { Controller } from '../../core/controller/controller.abstract.js';
import { AppComponent } from '../../types/common/app-component.enum.js';
import { HttpMethod } from '../../types/common/http-method.enum.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import { UnknownRecord } from '../../types/common/unknown-record.type.js';
import HttpError from '../../core/errors/http-error.js';
import { fillDTO } from '../../core/helpers/index.js';
import CreateRequestDto from './dto/create-request.dto.js';
import RequestRdo from './rdo/request.rdo.js';
import { PrivateRouteMiddleware } from '../../core/middlewares/private-route.middleware.js';
import { Role } from '../../types/role.enum.js';
import { RequestStatus } from './types/request-status.enum.js';
import { UserServiceInterface } from '../user/user-service.interface.js';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';
import UpdateRequestDto from './dto/update-request.dto.js';
import { ValidateObjectIdMiddleware } from '../../core/middlewares/validate-object-id.middleware.js';
import { DocumentExistsMiddleware } from '../../core/middlewares/document-exists.middleware.js';
import { ParamsGetRequest } from '../../types/params/params-get-request.type.js';
import { ParamsGetUser } from '../../types/params/params-get-user.type.js';
import { RoleCheckMiddleware } from '../../core/middlewares/role-check.middleware.js';
import { NotificationServiceInterface } from '../notification/notification-service.interface.js';

@injectable()
export default class RequestController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.RequestServiceInterface) private readonly requestService: RequestServiceInterface,
    @inject(AppComponent.NotificationServiceInterface) private readonly notificationService: NotificationServiceInterface,
    @inject(AppComponent.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(AppComponent.ConfigInterface) configService: ConfigInterface<RestSchema>
  ) {
    super(logger, configService);
    this.logger.info('Register routes for RequestController...');

    this.addRoute({ path: '/user/:userId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new RoleCheckMiddleware(Role.User),
        new ValidateObjectIdMiddleware('userId'),
        new DocumentExistsMiddleware(this.userService, 'User', 'userId'),
        new ValidateDtoMiddleware(CreateRequestDto)
      ]
    });
    this.addRoute({ path: '/:requestId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('requestId'),
        new DocumentExistsMiddleware(this.requestService, 'Request', 'requestId'),
        new ValidateDtoMiddleware(UpdateRequestDto)
      ]
    });
  }

  //TODO: Общее
  public async create(
    { params, body, user: initiator }: Request<core.ParamsDictionary | ParamsGetUser, UnknownRecord, CreateRequestDto>,
    res: Response
  ): Promise<void> {
    const { userId } = params;

    if (await this.requestService.existsRequestByType(initiator.id, userId, body.requestType)) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `${body.requestType} request with initiator id ${initiator.id} and user id ${userId} exists.`,
        'RequestController'
      );
    }

    const defaultStatus = RequestStatus.Pending;

    const request = await this.requestService.create({...body}, initiator.id, userId, defaultStatus);

    this.created(res, fillDTO(RequestRdo, request));

    await this.notificationService.createNotification(userId, body.requestType);
  }

  //TODO: Общее
  public async update(
    { params, body }: Request<core.ParamsDictionary | ParamsGetRequest, UnknownRecord, UpdateRequestDto>,
    res: Response
  ) {
    const { requestId } = params;

    const updatedRequest = await this.requestService.updateStatus({ ...body }, requestId);
    this.ok(res, fillDTO(RequestRdo, updatedRequest));
  }
}
