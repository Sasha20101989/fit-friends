
import { ModelType } from '@typegoose/typegoose/lib/types.js';
import { Container } from 'inversify';

import type { TokenServiceInterface } from './token-service.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import TokenService from './token-service.js';
import { TokenEntity, TokenModel } from './token.entity.js';

export function createTokenContainer() {
  const userContainer = new Container();
  userContainer.bind<TokenServiceInterface>(AppComponent.TokenServiceInterface).to(TokenService).inSingletonScope();
  userContainer.bind<ModelType<TokenEntity>>(AppComponent.TokenModel).toConstantValue(TokenModel);

  return userContainer;
}
