
import { ModelType } from '@typegoose/typegoose/lib/types.js';
import { Container } from 'inversify';

import { AppComponent } from '../../types/app-component.enum.js';
import TrainerService from './trainer-service.js';
import type { TrainerServiceInterface } from './trainer-service.interface.js';
import { TrainerEntity, TrainerModel } from './trainer.entity.js';


export function createTrainerContainer() {
  const userContainer = new Container();
  userContainer.bind<TrainerServiceInterface>(AppComponent.TrainerServiceInterface).to(TrainerService).inSingletonScope();
  userContainer.bind<ModelType<TrainerEntity>>(AppComponent.TrainerModel).toConstantValue(TrainerModel);

  return userContainer;
}
