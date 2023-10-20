import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import * as core from 'express-serve-static-core';

import { Controller } from '../../core/controller/controller.abstract.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { HttpMethod } from '../../types/http-method.enum.js';

import { fillDTO } from '../../core/helpers/common.js';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';
import { UnknownRecord } from '../../types/unknown-record.type.js';
import { ConfigInterface } from '../../core/config/config.interface.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import { TrainingServiceInterface } from './training-service.interface.js';
import CreateTrainingDto from './dto/create-training.dto.js';
import { PrivateRouteMiddleware } from '../../core/middlewares/private-route.middleware.js';
import { ValidateObjectIdMiddleware } from '../../core/middlewares/validate-object-id.middleware.js';
import { DocumentExistsMiddleware } from '../../core/middlewares/document-exists.middleware.js';
import { ParamsGetTraining } from '../../types/params-get-training.type.js';
import TrainingRdo from './rdo/training.rdo.js';
import HttpError from '../../core/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import { TrainerServiceInterface } from '../trainer/trainer-service.interface.js';

@injectable()
export default class TrainingController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) logger: LoggerInterface,
    @inject(AppComponent.TrainingServiceInterface) private readonly trainingService: TrainingServiceInterface,
    @inject(AppComponent.TrainerServiceInterface) private readonly trainerService: TrainerServiceInterface,
    @inject(AppComponent.ConfigInterface) configService: ConfigInterface<RestSchema>,
  ) {
    super(logger, configService);

    this.logger.info('Register routes for TrainingController...');

    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.createTraining, middlewares: [new PrivateRouteMiddleware(), new ValidateDtoMiddleware(CreateTrainingDto)]});
    this.addRoute({path: '/:trainingId', method: HttpMethod.Get, handler: this.showTrainingDetails, middlewares: [new PrivateRouteMiddleware(), new ValidateObjectIdMiddleware('trainingId'), new DocumentExistsMiddleware(this.trainingService, 'Training', 'trainingId')]});
  }

  public async createTraining(
    { body, user }: Request<UnknownRecord, UnknownRecord, CreateTrainingDto>,
    res: Response
  ): Promise<void> {

    if (!await this.trainerService.exists(user.id)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Trainer with id ${user.id} not found.`,
        'TrainingController'
      );
    }

    const result = await this.trainingService.create({ ...body, trainer: user?.id });
    const training = await this.trainingService.getTrainingDetails(result.id);
    this.created(res, fillDTO(TrainingRdo, training));
  }

  public async showTrainingDetails(
    {params}: Request<core.ParamsDictionary | ParamsGetTraining>,
    res: Response
  ): Promise<void> {
    const {trainingId} = params;
    const training = await this.trainingService.getTrainingDetails(trainingId);

    this.ok(res, fillDTO(TrainingRdo, training));
  }
}
