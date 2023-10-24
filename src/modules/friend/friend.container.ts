import { Container } from 'inversify';
import { AppComponent } from '../../types/app-component.enum.js';
import { ModelType } from '@typegoose/typegoose/lib/types.js';
import { ControllerInterface } from '../../core/controller/controller.interface.js';
import { FriendEntity, FriendModel } from './friend.entity.js';
import { FriendServiceInterface } from './friend-service.interface.js';
import FriendService from './friend-service.js';
import FriendController from './friend.controller.js';

export function createFriendContainer() {
  const friendContainer = new Container();
  friendContainer.bind<FriendServiceInterface>(AppComponent.FriendServiceInterface).to(FriendService).inSingletonScope();
  friendContainer.bind<ModelType<FriendEntity>>(AppComponent.FriendModel).toConstantValue(FriendModel);
  friendContainer.bind<ControllerInterface>(AppComponent.FriendController).to(FriendController).inSingletonScope();

  return friendContainer;
}
