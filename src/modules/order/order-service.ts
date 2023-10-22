import {types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { OrderServiceInterface } from './order-service.interface.js';
import { OrderEntity } from './order.entity.js';

@injectable()
export default class OrderService implements OrderServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.OrderModel) private readonly orderModel: types.ModelType<OrderEntity>
    ){}

  public async exists(documentId: string): Promise<boolean> {
    return this.orderModel.exists({ _id: documentId }).then((v) => v !== null);
  }

}
