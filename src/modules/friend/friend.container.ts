import { Container } from 'inversify';
import { AppComponent } from '../../types/app-component.enum.js';
import { ControllerInterface } from '../../core/controller/controller.interface.js';
import { FriendServiceInterface } from './friend-service.interface.js';
import FriendService from './friend-service.js';
import FriendController from './friend.controller.js';

export function createFriendContainer() {
  const friendContainer = new Container();
  friendContainer.bind<FriendServiceInterface>(AppComponent.FriendServiceInterface).to(FriendService).inSingletonScope();
  friendContainer.bind<ControllerInterface>(AppComponent.FriendController).to(FriendController).inSingletonScope();

  return friendContainer;
}
