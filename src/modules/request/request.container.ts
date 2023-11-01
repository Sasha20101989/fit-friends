
import { ModelType } from '@typegoose/typegoose/lib/types.js';
import { Container } from 'inversify';

import type { ControllerInterface } from '../../core/controller/controller.interface.js';
import type { RequestServiceInterface } from './request-service.interface.js';
import { AppComponent } from '../../types/common/app-component.enum.js';
import RequestService from './request-service.js';
import { RequestEntity, RequestModel } from './request.entity.js';
import RequestController from './request.controller.js';

export function createRequestContainer() {
  const requestContainer = new Container();
  requestContainer.bind<RequestServiceInterface>(AppComponent.RequestServiceInterface).to(RequestService).inSingletonScope();
  requestContainer.bind<ModelType<RequestEntity>>(AppComponent.RequestModel).toConstantValue(RequestModel);
  requestContainer.bind<ControllerInterface>(AppComponent.RequestController).to(RequestController).inSingletonScope();

  return requestContainer;
}
