
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';

import type { LoggerInterface } from '../../core/logger/logger.interface.js';
import type { TrainingRequestServiceInterface } from './training-request-service.interface.js';
import type { ConfigInterface } from '../../core/config/config.interface.js';
import { Controller } from '../../core/controller/controller.abstract.js';
import { AppComponent } from '../../types/common/app-component.enum.js';
import { HttpMethod } from '../../types/common/http-method.enum.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import { UnknownRecord } from '../../types/common/unknown-record.type.js';
import HttpError from '../../core/errors/http-error.js';
import { fillDTO } from '../../core/helpers/index.js';
import CreateTrainingRequestDto from './dto/create-training-request.dto.js';
import TrainingRequestRdo from './rdo/trainingRequest.rdo.js';
import { PrivateRouteMiddleware } from '../../core/middlewares/private-route.middleware.js';
import { Role } from '../../types/role.enum.js';
import { RequestStatus } from './types/request-status.enum.js';
import { UserServiceInterface } from '../user/user-service.interface.js';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';
import UpdateTrainingRequestDto from './dto/update-training-request.dto.js';
import { ValidateObjectIdMiddleware } from '../../core/middlewares/validate-object-id.middleware.js';
import { DocumentExistsMiddleware } from '../../core/middlewares/document-exists.middleware.js';
import { ParamsGetRequest } from '../../types/params/params-get-request.type.js';
import { ParamsGetUser } from '../../types/params/params-get-user.type.js';
import { RoleCheckMiddleware } from '../../core/middlewares/role-check.middleware.js';
import { NotificationServiceInterface } from '../notification/notification-service.interface.js';
import { Notification, NotificationType } from '../notification/types/notification.type.js';

@injectable()
export default class TrainingRequestController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.TrainingRequestServiceInterface) private readonly trainingRequestService: TrainingRequestServiceInterface,
    @inject(AppComponent.NotificationServiceInterface) private readonly notificationService: NotificationServiceInterface,
    @inject(AppComponent.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(AppComponent.ConfigInterface) configService: ConfigInterface<RestSchema>
  ) {
    super(logger, configService);
    this.logger.info('Register routes for TrainingRequestController...');

    this.addRoute({ path: '/user/:userId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new RoleCheckMiddleware(Role.User),
        new ValidateObjectIdMiddleware('userId'),
        new DocumentExistsMiddleware(this.userService, 'User', 'userId'),
        new ValidateDtoMiddleware(CreateTrainingRequestDto)
      ]
    });
    this.addRoute({ path: '/:trainingRequestId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('trainingRequestId'),
        new DocumentExistsMiddleware(this.trainingRequestService, 'TrainingRequest', 'trainingRequestId'),
        new ValidateDtoMiddleware(UpdateTrainingRequestDto)
      ]
    });
  }

  public async create(
    { params, body, user: initiator }: Request<core.ParamsDictionary | ParamsGetUser, UnknownRecord, CreateTrainingRequestDto>,
    res: Response
  ): Promise<void> {
    const { userId } = params;

    if (await this.trainingRequestService.existsRequestByType(initiator.id, userId, body.requestType)) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `${body.requestType} request with initiator id ${initiator.id} and user id ${userId} exists.`,
        'TrainingRequestController'
      );
    }

    const defaultStatus = RequestStatus.Pending;

    const request = await this.trainingRequestService.create({...body}, initiator.id, userId, defaultStatus);

    this.created(res, fillDTO(TrainingRequestRdo, request));

    const notification: Notification = {
      user: userId,
      type: NotificationType.PersonalTrainingRequest,
      text: 'Вас приглашают тренировку'
    }

    await this.notificationService.create(notification);
  }

  public async update(
    { params, body }: Request<core.ParamsDictionary | ParamsGetRequest, UnknownRecord, UpdateTrainingRequestDto>,
    res: Response
  ) {
    const { trainingRequestId } = params;

    const updatedRequest = await this.trainingRequestService.updateStatus({ ...body }, trainingRequestId);
    this.ok(res, fillDTO(TrainingRequestRdo, updatedRequest));
  }
}
