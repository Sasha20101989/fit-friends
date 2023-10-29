import { inject, injectable } from 'inversify';

import { AppComponent } from '../../types/app-component.enum.js';
import { Connection, connect } from 'amqplib';
import { RabbitServerInterface } from './rabit-server.interface.js';
import { ServerProducerInterface } from './producer/server-producer.interface.js';
import { Subscriber } from '../../types/subscriber.interface.js';

@injectable()
export default class RabbitServerService implements RabbitServerInterface {
  constructor(
    @inject(AppComponent.ServerProducerInterface) private readonly producer: ServerProducerInterface,
  ) {}

  public async initialize(rabbitConnectionString: string): Promise<Connection | undefined>{
    return await connect(rabbitConnectionString);
  }

  public async produce(correlationId: string, data: Subscriber, replyToQueue: string): Promise<void> {
    return await this.producer.produceMessages(correlationId, data, replyToQueue);
  }
}
