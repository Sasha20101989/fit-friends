
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import * as core from 'express-serve-static-core';
import { Request, Response } from 'express';

import type { LoggerInterface } from '../../core/logger/logger.interface.js';
import type { ReviewServiceInterface } from './review-service.interface.js';
import type { ConfigInterface } from '../../core/config/config.interface.js';
import { Controller } from '../../core/controller/controller.abstract.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';
import { UnknownRecord } from '../../types/unknown-record.type.js';
import HttpError from '../../core/errors/http-error.js';
import { fillDTO } from '../../core/helpers/index.js';
import CreateReviewDto from './dto/create-review.dto.js';
import ReviewRdo from './rdo/review.rdo.js';
import { Role } from '../../types/role.enum.js';
import { PrivateRouteMiddleware } from '../../core/middlewares/private-route.middleware.js';
import { TrainingServiceInterface } from '../training/training-service.interface.js';
import { DocumentExistsMiddleware } from '../../core/middlewares/document-exists.middleware.js';
import { ValidateObjectIdMiddleware } from '../../core/middlewares/validate-object-id.middleware.js';
import { ParamsGetTraining } from '../../types/params-get-training.type.js';

@injectable()
export default class ReviewController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.ReviewServiceInterface) private readonly reviewService: ReviewServiceInterface,
    @inject(AppComponent.TrainingServiceInterface) private readonly trainingService: TrainingServiceInterface,
    @inject(AppComponent.ConfigInterface) configService: ConfigInterface<RestSchema>
  ) {
    super(logger, configService);
    this.logger.info('Register routes for ReviewController...');

    this.addRoute({ path: '/training/:trainingId', method: HttpMethod.Get, handler: this.index, middlewares: [ new PrivateRouteMiddleware(), new ValidateObjectIdMiddleware('trainingId'), new DocumentExistsMiddleware(this.trainingService, 'Training', 'trainingId')] });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create, middlewares: [ new PrivateRouteMiddleware(), new ValidateDtoMiddleware(CreateReviewDto)] });
  }

  public async index(
    {params , user}: Request<core.ParamsDictionary | ParamsGetTraining>,
    res: Response
  ) {
    const { trainingId } = params;

    if(!user){
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    if(user.role != Role.User){
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Access denied: You do not have the required role to perform this action.',
        'UserController'
      );
    }

    const reviews = await this.reviewService.GetReviewsByTrainingId(trainingId);

    this.ok(res, fillDTO(ReviewRdo, reviews));
  }

  public async create(
    { body, user }: Request<UnknownRecord, UnknownRecord, CreateReviewDto>,
    res: Response
  ): Promise<void> {

    if (user.role !== Role.User) {
      throw new HttpError(
          StatusCodes.BAD_REQUEST,
          'Access denied: You do not have the required role to perform this action.',
          'OrderController'
      );
    }

    if (!await this.trainingService.exists(body.training)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Training with id ${body.training} not found.`,
        'OrderController'
      );
    }

    const review = await this.reviewService.create({...body}, user.id);

    this.created(res, fillDTO(ReviewRdo, review));
  }
}
