
import { ModelType } from '@typegoose/typegoose/lib/types.js';
import { Container } from 'inversify';

import type { TrainerServiceInterface } from './trainer-service.interface.js';
import type { ControllerInterface } from '../../core/controller/controller.interface.js';
import { AppComponent } from '../../types/common/app-component.enum.js';
import TrainerService from './trainer-service.js';
import { TrainerEntity, TrainerModel } from './trainer.entity.js';
import TrainerController from './trainer.controller.js';


export function createTrainerContainer() {
  const userContainer = new Container();
  userContainer.bind<TrainerServiceInterface>(AppComponent.TrainerServiceInterface).to(TrainerService).inSingletonScope();
  userContainer.bind<ModelType<TrainerEntity>>(AppComponent.TrainerModel).toConstantValue(TrainerModel);
  userContainer.bind<ControllerInterface>(AppComponent.TrainerController).to(TrainerController).inSingletonScope();

  return userContainer;
}
