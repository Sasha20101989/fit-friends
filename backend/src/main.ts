import 'reflect-metadata';
import { Container } from 'inversify';

import RestApplication from './app/rest.js';
import { AppComponent } from './types/common/app-component.enum.js';
import { createRestApplicationContainer } from './app/rest.container.js';
import { createUserContainer } from './modules/user/user.container.js';
import { createTrainerContainer } from './modules/trainer/trainer.container.js';
import { createTokenContainer } from './modules/token/token.container.js';
import { createTrainingContainer } from './modules/training/training.container.js';
import { createOrderContainer } from './modules/order/order.container.js';
import { createFriendContainer } from './modules/friend/friend.container.js';
import { createBalanceContainer } from './modules/balance/balance.container.js';
import { createReviewContainer } from './modules/review/review.container.js';
import { createRequestContainer } from './modules/request/request.container.js';
import { createRabbitClientContainer } from './core/rabbit-client/rabit-client.container.js';
import { createRabbitServerContainer } from './core/rabit-server/rabit-server.container.js';
import { createSubscriberContainer } from './modules/subscriber/subscriber.container.js';
import { createNotificationContainer } from './modules/notification/notification.container.js';

async function bootstrap() {
  const mainContainer = Container.merge(
    createRabbitClientContainer(),
    createRabbitServerContainer(),
    createRestApplicationContainer(),
    createTokenContainer(),
    createTrainerContainer(),
    createUserContainer(),
    createFriendContainer(),
    createTrainingContainer(),
    createOrderContainer(),
    createBalanceContainer(),
    createReviewContainer(),
    createRequestContainer(),
    createSubscriberContainer(),
    createNotificationContainer(),
  );

  const application = mainContainer.get<RestApplication>(AppComponent.RestApplication);
  await application.init();
}

bootstrap().catch(console.error);
