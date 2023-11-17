
import { Container } from 'inversify';
import { AppComponent } from '../../types/common/app-component.enum.js';
import { ClientConsumerInterface } from './consumer/client-consumer.interface.js';
import ClientConsumer from './consumer/client-consumer.js';
import { ClientProducerInterface } from './producer/client-producer.interface.js';
import ClientProducer from './producer/client-producer.js';
import { RabbitClientInterface } from './rabit-client.interface.js';
import RabbitClientService from './rabit-client.service.js';

export function createRabbitClientContainer() {
  const rabbitContainer = new Container();
  rabbitContainer.bind<RabbitClientInterface>(AppComponent.RabbitClientInterface).to(RabbitClientService).inSingletonScope();
  rabbitContainer.bind<ClientConsumerInterface>(AppComponent.ClientConsumerInterface).to(ClientConsumer).inSingletonScope();
  rabbitContainer.bind<ClientProducerInterface>(AppComponent.ClientProducerInterface).to(ClientProducer).inSingletonScope();

  return rabbitContainer;
}
