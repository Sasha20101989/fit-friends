import 'reflect-metadata';
import { Container } from 'inversify';

import RestApplication from './app/rest.js';
import { AppComponent } from './types/app-component.enum.js';
import { createRestApplicationContainer } from './app/rest.container.js';
import { createUserContainer } from './modules/user/user.container.js';
import { createTrainerContainer } from './modules/trainer/trainer.container.js';
import { createTokenContainer } from './modules/token/token.container.js';
import { createTrainingContainer } from './modules/training/training.container.js';
import { createOrderContainer } from './modules/order/order.container.js';
import { createFriendContainer } from './modules/friend/friend.container.js';

async function bootstrap() {
  const mainContainer = Container.merge(
    createRestApplicationContainer(),
    createTokenContainer(),
    createTrainerContainer(),
    createUserContainer(),
    createFriendContainer(),
    createTrainingContainer(),
    createOrderContainer(),
  );

  const application = mainContainer.get<RestApplication>(AppComponent.RestApplication);
  await application.init();
}

bootstrap().catch(console.error);
