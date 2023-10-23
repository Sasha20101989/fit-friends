import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';

import type { LoggerInterface } from '../../core/logger/logger.interface.js';
import type { ConfigInterface } from '../../core/config/config.interface.js';
import { Controller } from '../../core/controller/controller.abstract.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import { OrderServiceInterface } from './order-service.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { fillDTO } from '../../core/helpers/index.js';
import { ParamsGetOrder } from '../../types/params-get-order.js';
import { DocumentExistsMiddleware } from '../../core/middlewares/document-exists.middleware.js';
import { PrivateRouteMiddleware } from '../../core/middlewares/private-route.middleware.js';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../../core/errors/http-error.js';
import { Role } from '../../types/role.enum.js';
//import TrainingOrderRdo from './rdo/training-order.rdo.js';
import CreateOrderDto from './dto/create-order.dto.js';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';
import { UnknownRecord } from '../../types/unknown-record.type.js';
import { TrainerServiceInterface } from '../trainer/trainer-service.interface.js';
import OrderRdo from './rdo/order.rdo.js';
import TrainingOrderRdo from './rdo/training-order.rdo.js';


@injectable()
export default class OrderController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.OrderServiceInterface) private readonly orderService: OrderServiceInterface,
    @inject(AppComponent.TrainerServiceInterface) private readonly trainerService: TrainerServiceInterface,
    @inject(AppComponent.ConfigInterface) configService: ConfigInterface<RestSchema>
  ) {
    super(logger, configService);
    this.logger.info('Register routes for OrderController...');

    this.addRoute({ path: '/:trainerId', method: HttpMethod.Get, handler: this.index, middlewares: [new PrivateRouteMiddleware(),  new DocumentExistsMiddleware(this.trainerService, 'Trainer', 'trainerId')] });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create, middlewares: [new PrivateRouteMiddleware(), new ValidateDtoMiddleware(CreateOrderDto)]});
  }

  public async create(
    { body, user }: Request<UnknownRecord, UnknownRecord, CreateOrderDto>,
    res: Response
  ): Promise<void> {

    if (user.role !== Role.Trainer) {
      throw new HttpError(
          StatusCodes.BAD_REQUEST,
          'Access denied: You do not have the required role to perform this action.',
          'OrderController'
      );
    }

    if (!await this.trainerService.exists(user.id)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Trainer with id ${user.id} not found.`,
        'OrderController'
      );
    }

    const order = await this.orderService.create({...body});

    this.created(res, fillDTO(OrderRdo, order));
  }

  public async index(
    { params, user }: Request<core.ParamsDictionary | ParamsGetOrder>,
    res: Response
  ): Promise<void> {

    const { trainerId } = params;

    if(!user){
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'OrderController'
      );
    }

    if(trainerId != user.id){
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        "Access denied: You cannot access another trainer's training list.",
        "OrderController"
      );
    }

    if(user.role != Role.Trainer){
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        'Access denied: You do not have the required role to perform this action.',
        'OrderController'
      );
    }

    const orders = await this.orderService.findByTrainerId(user.id);

    this.ok(res, fillDTO(TrainingOrderRdo, orders));
  }
}
