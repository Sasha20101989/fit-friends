import { Container } from 'inversify';
import { OrderServiceInterface } from './order-service.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { ModelType } from '@typegoose/typegoose/lib/types.js';
import { ControllerInterface } from '../../core/controller/controller.interface.js';
import { OrderEntity, OrderModel } from './order.entity.js';
import OrderService from './order-service.js';
import OrderController from './order.controller.js';

export function createOrderContainer() {
  const trainingContainer = new Container();
  trainingContainer.bind<OrderServiceInterface>(AppComponent.OrderServiceInterface).to(OrderService).inSingletonScope();
  trainingContainer.bind<ModelType<OrderEntity>>(AppComponent.OrderModel).toConstantValue(OrderModel);
  trainingContainer.bind<ControllerInterface>(AppComponent.OrderController).to(OrderController).inSingletonScope();

  return trainingContainer;
}
