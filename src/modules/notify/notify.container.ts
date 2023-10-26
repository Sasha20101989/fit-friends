
import { ModelType } from '@typegoose/typegoose/lib/types.js';
import { Container } from 'inversify';

import type { ControllerInterface } from '../../core/controller/controller.interface.js';
import type { NotifyServiceInterface } from './notify-service.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import NotifyService from './notify-service.js';
import { NotifyEntity, NotifyModel } from './notify.entity.js';
import NotifyController from './notify.controller.js';

export function createNotifyContainer() {
  const notifyContainer = new Container();
  notifyContainer.bind<NotifyServiceInterface>(AppComponent.NotifyServiceInterface).to(NotifyService).inSingletonScope();
  notifyContainer.bind<ModelType<NotifyEntity>>(AppComponent.NotifyModel).toConstantValue(NotifyModel);
  notifyContainer.bind<ControllerInterface>(AppComponent.NotifyController).to(NotifyController).inSingletonScope();

  return notifyContainer;
}
