
import { ModelType } from '@typegoose/typegoose/lib/types.js';
import { Container } from 'inversify';

import type { ControllerInterface } from '../../core/controller/controller.interface.js';
import type { NotificationServiceInterface } from './notification-service.interface.js';
import { AppComponent } from '../../types/common/app-component.enum.js';
import NotificationService from './notification-service.js';
import { NotificationEntity, NotificationModel } from './notification.entity.js';
import NotificationController from './notification.controller.js';

export function createNotificationContainer() {
  const notificationContainer = new Container();
  notificationContainer.bind<NotificationServiceInterface>(AppComponent.NotificationServiceInterface).to(NotificationService).inSingletonScope();
  notificationContainer.bind<ModelType<NotificationEntity>>(AppComponent.NotificationModel).toConstantValue(NotificationModel);
  notificationContainer.bind<ControllerInterface>(AppComponent.NotificationController).to(NotificationController).inSingletonScope();

  return notificationContainer;
}
