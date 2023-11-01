import { inject, injectable } from 'inversify';
import * as core from 'express-serve-static-core';
import { Request, Response } from 'express';

import type { LoggerInterface } from '../../core/logger/logger.interface.js';
import type { ConfigInterface } from '../../core/config/config.interface.js';
import { Controller } from '../../core/controller/controller.abstract.js';
import { AppComponent } from '../../types/common/app-component.enum.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import { OrderServiceInterface } from './order-service.interface.js';
import { HttpMethod } from '../../types/common/http-method.enum.js';
import { fillDTO } from '../../core/helpers/index.js';
import { PrivateRouteMiddleware } from '../../core/middlewares/private-route.middleware.js';
import { Role } from '../../types/role.enum.js';
import CreateOrderDto from './dto/create-order.dto.js';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';
import { UnknownRecord } from '../../types/common/unknown-record.type.js';
import OrderRdo from './rdo/order.rdo.js';
import TrainingOrderRdo from './rdo/training-order.rdo.js';
import { OrderQueryParams } from './types/order-query-params.js';
import { RoleCheckMiddleware } from '../../core/middlewares/role-check.middleware.js';
import { DocumentExistsMiddleware } from '../../core/middlewares/document-exists.middleware.js';
import { ParamsGetTraining } from '../../types/params/params-get-training.type.js';
import { ValidateObjectIdMiddleware } from '../../core/middlewares/validate-object-id.middleware.js';
import { TrainingServiceInterface } from '../training/training-service.interface.js';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../../core/errors/http-error.js';
import { TrainerServiceInterface } from '../trainer/trainer-service.interface.js';
import { ParamsGetTrainer } from '../../types/params/params-get-trainer.type.js';

@injectable()
export default class OrderController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.OrderServiceInterface) private readonly orderService: OrderServiceInterface,
    @inject(AppComponent.TrainingServiceInterface) private readonly trainingService: TrainingServiceInterface,
    @inject(AppComponent.TrainerServiceInterface) private readonly traininerService: TrainerServiceInterface,
    @inject(AppComponent.ConfigInterface) configService: ConfigInterface<RestSchema>
  ) {
    super(logger, configService);
    this.logger.info('Register routes for OrderController...');

    this.addRoute({ path: '/trainer-room/:trainerId',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new PrivateRouteMiddleware(),
        new RoleCheckMiddleware(Role.Trainer),
        new ValidateObjectIdMiddleware('trainerId'),
        new DocumentExistsMiddleware(this.traininerService, 'Trainer', 'trainerId'),
      ]
    });
    this.addRoute({ path: '/:trainingId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new RoleCheckMiddleware(Role.Trainer),
        new ValidateObjectIdMiddleware('trainingId'),
        new DocumentExistsMiddleware(this.trainingService, 'Training', 'trainingId'),
        new ValidateDtoMiddleware(CreateOrderDto)
      ]
    });
  }

  //TODO: добавить того кто оформил
  public async create(
    { params, body, user }: Request<core.ParamsDictionary | ParamsGetTraining, UnknownRecord, CreateOrderDto>,
    res: Response
  ): Promise<void> {
    const { trainingId } = params;

    const training = await this.trainingService.findById(trainingId);
    if(!training){
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Training with id ${trainingId} not found.`,
        'OrderController'
      );
    }

    const order = await this.orderService.create({...body}, training, user.id);

    this.created(res, fillDTO(OrderRdo, order));
  }

  //TODO:Кабинет тренер
  public async index(
    { params, user: trainer, query }: Request<core.ParamsDictionary | ParamsGetTrainer, UnknownRecord, UnknownRecord, OrderQueryParams>,
    res: Response
  ): Promise<void> {

    const { trainerId } = params;

    if(trainerId !== trainer.id){
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        'Access denied: You do not have permission.',
        'OrderController'
      );
    }
    const orders = await this.orderService.findByTrainerId(trainer.id, query);

    this.ok(res, fillDTO(TrainingOrderRdo, orders));
  }
}
