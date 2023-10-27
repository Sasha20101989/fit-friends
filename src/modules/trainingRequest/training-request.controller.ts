
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';

import type { LoggerInterface } from '../../core/logger/logger.interface.js';
import type { TrainingRequestServiceInterface } from './training-request-service.interface.js';
import type { ConfigInterface } from '../../core/config/config.interface.js';
import { Controller } from '../../core/controller/controller.abstract.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import { UnknownRecord } from '../../types/unknown-record.type.js';
import HttpError from '../../core/errors/http-error.js';
import { fillDTO } from '../../core/helpers/index.js';
import CreateTrainingRequestDto from './dto/create-training-request.dto.js';
import TrainingRequestRdo from './rdo/trainingRequest.rdo.js';
import { PrivateRouteMiddleware } from '../../core/middlewares/private-route.middleware.js';
import { Role } from '../../types/role.enum.js';
import { RequestStatus } from '../../types/request-status.enum.js';
import { UserServiceInterface } from '../user/user-service.interface.js';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';
import UpdateTrainingRequestDto from './dto/update-training-request.dto.js';
import { ValidateObjectIdMiddleware } from '../../core/middlewares/validate-object-id.middleware.js';
import { DocumentExistsMiddleware } from '../../core/middlewares/document-exists.middleware.js';
import { ParamsGetRequest } from '../../types/params-get-request.js';
import { ParamsGetUser } from '../../types/params-get-user.type.js';

@injectable()
export default class TrainingRequestController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.TrainingRequestServiceInterface) private readonly trainingRequestService: TrainingRequestServiceInterface,
    @inject(AppComponent.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(AppComponent.ConfigInterface) configService: ConfigInterface<RestSchema>
  ) {
    super(logger, configService);
    this.logger.info('Register routes for TrainingRequestController...');

    this.addRoute({ path: '/user/:userId', method: HttpMethod.Post, handler: this.create, middlewares: [new PrivateRouteMiddleware(), new ValidateObjectIdMiddleware('userId'), new ValidateDtoMiddleware(CreateTrainingRequestDto), new DocumentExistsMiddleware(this.userService, 'User', 'userId')] });
    this.addRoute({path: '/:trainingRequestId', method: HttpMethod.Patch, handler: this.update, middlewares: [new PrivateRouteMiddleware(), new ValidateObjectIdMiddleware('trainingRequestId'), new ValidateDtoMiddleware(UpdateTrainingRequestDto), new DocumentExistsMiddleware(this.trainingRequestService, 'TrainingRequest', 'trainingRequestId')]});
  }

  public async create(
    { params, body, user }: Request<core.ParamsDictionary, UnknownRecord, CreateTrainingRequestDto>,
    res: Response
  ): Promise<void> {
    const { userId } = params as ParamsGetUser;

    if(!user){
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'TrainingRequestController'
      );
    }

    if (!await this.userService.exists(user.id)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Initiator with id ${user.id} not found.`,
        'TrainingRequestController'
      );
    }

    const initiator = user;

    if (initiator.role !== Role.User) {
      throw new HttpError(
          StatusCodes.BAD_REQUEST,
          'Access denied: You do not have the required role to perform this action.',
          'TrainingRequestController'
      );
    }

    if (await this.trainingRequestService.existsRequestByType(initiator.id, userId, body.requestType)) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `${body.requestType} request with initiator id ${initiator.id} and user id ${userId} exists.`,
        'TrainingRequestController'
      );
    }

    const request = await this.trainingRequestService.create({
      ...body,
      initiator: initiator.id,
      user: userId,
      status: RequestStatus.Pending
    });

    this.created(res, fillDTO(TrainingRequestRdo, request));
  }

  public async update(
    { params, body, user}: Request<core.ParamsDictionary, UnknownRecord, UpdateTrainingRequestDto>,
    res: Response
  ) {
    if(!user){
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'TrainingRequestController'
      );
    }

    const { trainingRequestId } = params as ParamsGetRequest;

    const updatedRequest = await this.trainingRequestService.updateStatus({ ...body }, trainingRequestId);
    this.ok(res, fillDTO(TrainingRequestRdo, updatedRequest));
  }
}
