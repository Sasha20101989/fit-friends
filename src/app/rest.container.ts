import { Container } from 'inversify';

import type { LoggerInterface } from '../core/logger/logger.interface.js';
import type { ConfigInterface } from '../core/config/config.interface.js';
import type { DatabaseClientInterface } from '../core/database-client/mongo-client.interface.js';

import { AppComponent } from '../types/app-component.enum.js';
import PinoService from '../core/logger/pino.service.js';
import RestApplication from './rest.js';
import { RestSchema } from '../core/config/rest.schema.js';
import ConfigService from '../core/config/config.service.js';
import MongoClientService from '../core/database-client/database-client.service.js';
import { RabbitClientInterface } from '../core/rabit-client/rabit-client.interface.js';
import RabbitClientService from '../core/rabit-client/rabit-client.service.js';
import ClientConsumer from '../core/rabit-client/consumer/client-consumer.js';
import { ClientConsumerInterface } from '../core/rabit-client/consumer/client-consumer.interface.js';
import ClientProducer from '../core/rabit-client/producer/client-producer.js';
import { ClientProducerInterface } from '../core/rabit-client/producer/client-producer.interface.js';

export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<RestApplication>(AppComponent.RestApplication).to(RestApplication).inSingletonScope();
  restApplicationContainer.bind<LoggerInterface>(AppComponent.LoggerInterface).to(PinoService).inSingletonScope();
  restApplicationContainer.bind<ConfigInterface<RestSchema>>(AppComponent.ConfigInterface).to(ConfigService).inSingletonScope();
  restApplicationContainer.bind<DatabaseClientInterface>(AppComponent.DatabaseClientInterface).to(MongoClientService).inSingletonScope();
  restApplicationContainer.bind<RabbitClientInterface>(AppComponent.RabbitClientInterface).to(RabbitClientService).inSingletonScope();
  restApplicationContainer.bind<ClientConsumerInterface>(AppComponent.ClientConsumerInterface).to(ClientConsumer).inSingletonScope();
  restApplicationContainer.bind<ClientProducerInterface>(AppComponent.ClientProducerInterface).to(ClientProducer).inSingletonScope();

  return restApplicationContainer;
}
