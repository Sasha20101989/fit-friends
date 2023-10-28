
import { ModelType } from '@typegoose/typegoose/lib/types.js';
import { Container } from 'inversify';

import type { ControllerInterface } from '../../core/controller/controller.interface.js';
import type { SubscriberServiceInterface } from './subscriber-service.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import SubscriberService from './subscriber-service.js';
import { SubscriberEntity, SubscriberModel } from './subscriber.entity.js';
import SubscriberController from './subscriber.controller.js';

export function createSubscriberContainer() {
  const subscriberContainer = new Container();
  subscriberContainer.bind<SubscriberServiceInterface>(AppComponent.SubscriberServiceInterface).to(SubscriberService).inSingletonScope();
  subscriberContainer.bind<ModelType<SubscriberEntity>>(AppComponent.SubscriberModel).toConstantValue(SubscriberModel);
  subscriberContainer.bind<ControllerInterface>(AppComponent.SubscriberController).to(SubscriberController).inSingletonScope();

  return subscriberContainer;
}
