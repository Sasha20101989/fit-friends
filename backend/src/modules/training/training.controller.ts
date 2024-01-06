import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import * as core from 'express-serve-static-core';

import { Controller } from '../../core/controller/controller.abstract.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { AppComponent } from '../../types/common/app-component.enum.js';
import { HttpMethod } from '../../types/common/http-method.enum.js';

import { fillDTO, getRandomBackgroundImage } from '../../core/helpers/common.js';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';
import { UnknownRecord } from '../../types/common/unknown-record.type.js';
import { ConfigInterface } from '../../core/config/config.interface.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import { TrainingServiceInterface } from './training-service.interface.js';
import CreateTrainingDto from './dto/create-training.dto.js';
import { PrivateRouteMiddleware } from '../../core/middlewares/private-route.middleware.js';
import { ValidateObjectIdMiddleware } from '../../core/middlewares/validate-object-id.middleware.js';
import { DocumentExistsMiddleware } from '../../core/middlewares/document-exists.middleware.js';
import { ParamsGetTraining } from '../../types/params/params-get-training.type.js';
import TrainingRdo from './rdo/training.rdo.js';
import { StatusCodes } from 'http-status-codes';
import UpdateTrainingDto from './dto/update-training.dto.js';
import { Role } from '../../types/role.enum.js';
import { TrainingQueryParams } from './types/training-query-params.js';
import { RoleCheckMiddleware } from '../../core/middlewares/role-check.middleware.js';
import { ParamsGetTrainer } from '../../types/params/params-get-trainer.type.js';
import { TrainerServiceInterface } from '../trainer/trainer-service.interface.js';
import { UploadTrainingVideoRdo } from './rdo/upload-video-training.rdo.js';
import { UploadVideoMiddleware } from '../../core/middlewares/upload-video.middleware.js';
import { HttpError } from '../../core/errors/http-error.js';

@injectable()
export default class TrainingController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) logger: LoggerInterface,
    @inject(AppComponent.TrainingServiceInterface) private readonly trainingService: TrainingServiceInterface,
    @inject(AppComponent.TrainerServiceInterface) private readonly traininerService: TrainerServiceInterface,
    @inject(AppComponent.ConfigInterface) configService: ConfigInterface<RestSchema>,
  ) {
    super(logger, configService);

    this.logger.info('Register routes for TrainingController...');

    this.addRoute({ path: '/trainer-room/',
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
    this.addRoute({ path: '/trainer-room/:trainingId',
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
    this.addRoute({ path: '/trainer-room/:trainerId',
      method: HttpMethod.Get,
      handler: this.indexForTrainer,
      middlewares: [
        new PrivateRouteMiddleware(),
        new RoleCheckMiddleware(Role.Trainer),
        new ValidateObjectIdMiddleware('trainerId'),
        new DocumentExistsMiddleware(this.traininerService, 'Trainer', 'trainerId'),
      ]
    });
    this.addRoute({ path: '/',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new PrivateRouteMiddleware()
      ]
    });
    this.addRoute({
      path: '/:trainingId/video',
      method: HttpMethod.Post,
      handler: this.uploadVideo,
      middlewares: [
        new ValidateObjectIdMiddleware('trainingId'),
        new UploadVideoMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'video'),
      ]
    });
  }

  public async uploadVideo(req: Request, res: Response) {
    const {trainingId} = req.params;
    const uploadFile = {video: req.file?.filename};
    await this.trainingService.update(trainingId, uploadFile);
    this.created(res, fillDTO(UploadTrainingVideoRdo, uploadFile));
  }

  public async index(
    { query }: Request<UnknownRecord, UnknownRecord, UnknownRecord, TrainingQueryParams>,
    res: Response
  ) {
    const trainings = await this.trainingService.find(query);

    this.ok(res, fillDTO(TrainingRdo, trainings));
  }

  public async indexForTrainer(
    { params, query, user: trainer }: Request<core.ParamsDictionary | ParamsGetTrainer, UnknownRecord, TrainingQueryParams>,
    res: Response
  ) {
    const { trainerId } = params;

    if(trainerId !== trainer.id){
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        'Access denied: You do not have permission to edit this training.',
        'TrainingController'
      );
    }

    const trainings = await this.trainingService.find(query, trainer.id);

    this.ok(res, fillDTO(TrainingRdo, trainings));
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
    const randomBackgroundImage = getRandomBackgroundImage();

    const createTrainingDto: CreateTrainingDto = {
      ...body,
      backgroundImage: randomBackgroundImage,
      trainer: user?.id,
    };

    const training = await this.trainingService.create(createTrainingDto);
    this.created(res, fillDTO(TrainingRdo, training));

    await this.trainingService.sendTrainingNotifications(user.id, training);
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
