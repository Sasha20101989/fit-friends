
import { inject, injectable } from 'inversify';
import * as core from 'express-serve-static-core';
import { Request, Response } from 'express';

import type { LoggerInterface } from '../../core/logger/logger.interface.js';
import type { ReviewServiceInterface } from './review-service.interface.js';
import type { ConfigInterface } from '../../core/config/config.interface.js';
import { Controller } from '../../core/controller/controller.abstract.js';
import { AppComponent } from '../../types/common/app-component.enum.js';
import { HttpMethod } from '../../types/common/http-method.enum.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';
import { UnknownRecord } from '../../types/common/unknown-record.type.js';
import { fillDTO } from '../../core/helpers/index.js';
import CreateReviewDto from './dto/create-review.dto.js';
import ReviewRdo from './rdo/review.rdo.js';
import { Role } from '../../types/role.enum.js';
import { PrivateRouteMiddleware } from '../../core/middlewares/private-route.middleware.js';
import { TrainingServiceInterface } from '../training/training-service.interface.js';
import { DocumentExistsMiddleware } from '../../core/middlewares/document-exists.middleware.js';
import { ValidateObjectIdMiddleware } from '../../core/middlewares/validate-object-id.middleware.js';
import { ParamsGetTraining } from '../../types/params/params-get-training.type.js';
import { RoleCheckMiddleware } from '../../core/middlewares/role-check.middleware.js';

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

    this.addRoute({ path: '/training/:trainingId',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('trainingId'),
        new DocumentExistsMiddleware(this.trainingService, 'Training', 'trainingId')
      ]
    });
    this.addRoute({ path: '/training/:trainingId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new RoleCheckMiddleware(Role.User),
        new ValidateObjectIdMiddleware('trainingId'),
        new DocumentExistsMiddleware(this.trainingService, 'Training', 'trainingId'),
        new ValidateDtoMiddleware(CreateReviewDto)
      ]
    });
  }

  //TODO: Общее
  public async index(
    { query, params }: Request<core.ParamsDictionary | ParamsGetTraining>,
    res: Response
  ) {
    const { trainingId } = params;
    const { limit } = query;

    const reviews = await this.reviewService.GetReviewsByTrainingId(trainingId, Number(limit));

    this.ok(res, fillDTO(ReviewRdo, reviews));
  }

  //TODO: Общее
  public async create(
    { params, body, user }: Request<core.ParamsDictionary | ParamsGetTraining, UnknownRecord, CreateReviewDto>,
    res: Response
  ): Promise<void> {
    const { trainingId } = params;

    const review = await this.reviewService.create({...body}, trainingId, user.id);

    this.created(res, fillDTO(ReviewRdo, review));
  }
}
