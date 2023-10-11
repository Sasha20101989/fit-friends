
import { ModelType } from '@typegoose/typegoose/lib/types.js';
import { Container } from 'inversify';

import { AppComponent } from '../../types/app-component.enum.js';
import UserService from './user-service.js';
import type { UserServiceInterface } from './user-service.interface.js';
import { UserEntity, UserModel } from './user.entity.js';
import { ControllerInterface } from '../../core/controller/controller.interface.js';
import UserController from './user.controller.js';


export function createUserContainer() {
  const userContainer = new Container();
  userContainer.bind<UserServiceInterface>(AppComponent.UserServiceInterface).to(UserService).inSingletonScope();
  userContainer.bind<ModelType<UserEntity>>(AppComponent.UserModel).toConstantValue(UserModel);
  userContainer.bind<ControllerInterface>(AppComponent.UserController).to(UserController).inSingletonScope();

  return userContainer;
}
