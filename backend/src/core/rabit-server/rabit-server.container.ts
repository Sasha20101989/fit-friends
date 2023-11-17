
import { Container } from 'inversify';
import { AppComponent } from '../../types/common/app-component.enum.js';
import { RabbitServerInterface } from './rabit-server.interface.js';
import RabbitServerService from './rabit-server.service.js';
import { ServerConsumerInterface } from './consumer/server-consumer.interface.js';
import ServerConsumer from './consumer/server-consumer.js';
import { ServerProducerInterface } from './producer/server-producer.interface.js';
import ServerProducer from './producer/server-producer.js';

export function createRabbitServerContainer() {
  const rabbitContainer = new Container();
  rabbitContainer.bind<RabbitServerInterface>(AppComponent.RabbitServerInterface).to(RabbitServerService).inSingletonScope();
  rabbitContainer.bind<ServerConsumerInterface>(AppComponent.ServerConsumerInterface).to(ServerConsumer).inSingletonScope();
  rabbitContainer.bind<ServerProducerInterface>(AppComponent.ServerProducerInterface).to(ServerProducer).inSingletonScope();

  return rabbitContainer;
}
