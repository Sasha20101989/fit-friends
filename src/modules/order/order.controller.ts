import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';

import type { LoggerInterface } from '../../core/logger/logger.interface.js';
import type { ConfigInterface } from '../../core/config/config.interface.js';
import { Controller } from '../../core/controller/controller.abstract.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import { OrderServiceInterface } from './order-service.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { fillDTO } from '../../core/helpers/index.js';
import { PrivateRouteMiddleware } from '../../core/middlewares/private-route.middleware.js';
import { Role } from '../../types/role.enum.js';
import CreateOrderDto from './dto/create-order.dto.js';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';
import { UnknownRecord } from '../../types/unknown-record.type.js';
import OrderRdo from './rdo/order.rdo.js';
import TrainingOrderRdo from './rdo/training-order.rdo.js';
import { OrderQueryParams } from '../../types/order-query-params.js';
import { RoleCheckMiddleware } from '../../core/middlewares/role-check.middleware.js';


@injectable()
export default class OrderController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.OrderServiceInterface) private readonly orderService: OrderServiceInterface,
    @inject(AppComponent.ConfigInterface) configService: ConfigInterface<RestSchema>
  ) {
    super(logger, configService);
    this.logger.info('Register routes for OrderController...');

    this.addRoute({ path: '/',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new PrivateRouteMiddleware(),
        new RoleCheckMiddleware(Role.Trainer)
      ]
    });
    this.addRoute({ path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new RoleCheckMiddleware(Role.Trainer),
        new ValidateDtoMiddleware(CreateOrderDto)
      ]
    });
  }

  public async create(
    { body }: Request<UnknownRecord, UnknownRecord, CreateOrderDto>,
    res: Response
  ): Promise<void> {
    const order = await this.orderService.create({...body});

    this.created(res, fillDTO(OrderRdo, order));
  }

  public async index(
    { user: trainer, query }: Request<UnknownRecord, UnknownRecord, UnknownRecord, OrderQueryParams>,
    res: Response
  ): Promise<void> {
    const orders = await this.orderService.findByTrainerId(trainer.id, query);

    this.ok(res, fillDTO(TrainingOrderRdo, orders));
  }
}
