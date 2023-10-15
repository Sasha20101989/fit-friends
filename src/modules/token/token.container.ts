
import { ModelType } from '@typegoose/typegoose/lib/types.js';
import { Container } from 'inversify';

import { AppComponent } from '../../types/app-component.enum.js';
import { TokenServiceInterface } from './token-service.interface.js';
import TokenService from './token-service.js';
import { TokenEntity, TokenModel } from './token.entity.js';
import { ControllerInterface } from '../../core/controller/controller.interface.js';
import TokenController from './token.controller.js';


export function createTokenContainer() {
  const userContainer = new Container();
  userContainer.bind<TokenServiceInterface>(AppComponent.TokenServiceInterface).to(TokenService).inSingletonScope();
  userContainer.bind<ModelType<TokenEntity>>(AppComponent.TokenModel).toConstantValue(TokenModel);
  userContainer.bind<ControllerInterface>(AppComponent.TokenController).to(TokenController).inSingletonScope();

  return userContainer;
}
