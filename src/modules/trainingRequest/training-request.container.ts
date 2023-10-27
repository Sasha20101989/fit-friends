
import { ModelType } from '@typegoose/typegoose/lib/types.js';
import { Container } from 'inversify';

import type { ControllerInterface } from '../../core/controller/controller.interface.js';
import type { TrainingRequestServiceInterface } from './training-request-service.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import TrainingRequestService from './training-request-service.js';
import { TrainingRequestEntity, TrainingRequestModel } from './training-request.entity.js';
import TrainingRequestController from './training-request.controller.js';

export function createTrainingRequestContainer() {
  const trainingRequestContainer = new Container();
  trainingRequestContainer.bind<TrainingRequestServiceInterface>(AppComponent.TrainingRequestServiceInterface).to(TrainingRequestService).inSingletonScope();
  trainingRequestContainer.bind<ModelType<TrainingRequestEntity>>(AppComponent.TrainingRequestModel).toConstantValue(TrainingRequestModel);
  trainingRequestContainer.bind<ControllerInterface>(AppComponent.TrainingRequestController).to(TrainingRequestController).inSingletonScope();

  return trainingRequestContainer;
}
