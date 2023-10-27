import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import * as core from 'express-serve-static-core';

import { Controller } from '../../core/controller/controller.abstract.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { HttpMethod } from '../../types/http-method.enum.js';

import { fillDTO, getRandomBackgroundImage } from '../../core/helpers/common.js';
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
import UpdateTrainingDto from './dto/update-training.dto.js';
import { Role } from '../../types/role.enum.js';
import { TrainingQueryParams } from '../../types/training-query-params.js';
import { RoleCheckMiddleware } from '../../core/middlewares/role-check.middleware.js';

@injectable()
export default class TrainingController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) logger: LoggerInterface,
    @inject(AppComponent.TrainingServiceInterface) private readonly trainingService: TrainingServiceInterface,
    @inject(AppComponent.ConfigInterface) configService: ConfigInterface<RestSchema>,
  ) {
    super(logger, configService);

    this.logger.info('Register routes for TrainingController...');

    this.addRoute({ path: '/',
      method: HttpMethod.Post,
      handler: this.createTraining,
      middlewares: [
        new PrivateRouteMiddleware(),
        new RoleCheckMiddleware(Role.Trainer),
        new ValidateDtoMiddleware(CreateTrainingDto)
      ]
    });
    this.addRoute({ path: '/:trainingId',
      method: HttpMethod.Get,
      handler: this.showTrainingDetails,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('trainingId'),
        new DocumentExistsMiddleware(this.trainingService, 'Training', 'trainingId')
      ]
    });
    this.addRoute({ path: '/:trainingId',
      method: HttpMethod.Put,
      handler: this.updateTraining,
      middlewares: [
        new PrivateRouteMiddleware(),
        new RoleCheckMiddleware(Role.Trainer),
        new ValidateObjectIdMiddleware('trainingId'),
        new DocumentExistsMiddleware(this.trainingService, 'Training', 'trainingId'),
        new ValidateDtoMiddleware(UpdateTrainingDto)
      ]
    });
    this.addRoute({ path: '/',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new PrivateRouteMiddleware()
      ]
    });
  }

  public async index(
    { query }: Request<UnknownRecord, UnknownRecord, UnknownRecord, TrainingQueryParams>,
    res: Response
  ) {
    const trainings = await this.trainingService.GetAllTrainings(query);

    this.ok(res, fillDTO(TrainingRdo, trainings || []));
  }

  public async updateTraining(
    {params, body, user}: Request<core.ParamsDictionary | ParamsGetTraining, UnknownRecord, UpdateTrainingDto>,
    res: Response
  ): Promise<void> {
    const { trainingId } = params;

    const training = await this.trainingService.getTrainingDetails(trainingId);

    if(training && training.trainer.id !== user.id){
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        'Access denied: You do not have permission to edit this training.',
        'TrainingController'
      );
    }

    const updatedTraining = await this.trainingService.update(trainingId, body);
    this.ok(res, fillDTO(TrainingRdo, updatedTraining));
  }

  public async createTraining(
    { body, user }: Request<UnknownRecord, UnknownRecord, CreateTrainingDto>,
    res: Response
  ): Promise<void> {
    const randomBackgroundImage= getRandomBackgroundImage();

    const createTrainingDto: CreateTrainingDto = {
        ...body,
        backgroundImage: randomBackgroundImage,
        trainer: user?.id,
    };

    const result = await this.trainingService.create(createTrainingDto);
    const training = await this.trainingService.getTrainingDetails(result.id);
    this.created(res, fillDTO(TrainingRdo, training));
  }

  public async showTrainingDetails(
    { params }: Request<core.ParamsDictionary | ParamsGetTraining>,
    res: Response
  ): Promise<void> {
    const {trainingId} = params;
    const training = await this.trainingService.getTrainingDetails(trainingId);

    this.ok(res, fillDTO(TrainingRdo, training));
  }
}
