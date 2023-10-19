import { ModelType } from '@typegoose/typegoose/lib/types.js';
import { Container } from 'inversify';

import type { ControllerInterface } from '../../core/controller/controller.interface.js';
import type { TrainingServiceInterface } from './training-service.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import TrainingService from './training-service.js';
import TrainingController from './training.controller.js';
import { TrainingEntity, TrainingModel } from './training.entity.js';


export function createTrainingContainer() {
  const trainingContainer = new Container();
  trainingContainer.bind<TrainingServiceInterface>(AppComponent.TrainingServiceInterface).to(TrainingService).inSingletonScope();
  trainingContainer.bind<ModelType<TrainingEntity>>(AppComponent.TrainingModel).toConstantValue(TrainingModel);
  trainingContainer.bind<ControllerInterface>(AppComponent.TrainingController).to(TrainingController).inSingletonScope();

  return trainingContainer;
}
