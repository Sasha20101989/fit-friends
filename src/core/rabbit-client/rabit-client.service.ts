import { inject, injectable } from 'inversify';

import { AppComponent } from '../../types/common/app-component.enum.js';
import { Connection, connect } from 'amqplib';
import { RabbitClientInterface } from './rabit-client.interface.js';
import { RabbitRouting } from '../../types/rabbit-routing.enum.js';
import { ClientProducerInterface } from './producer/client-producer.interface.js';
import { Subscriber } from '../../modules/subscriber/types/subscriber.interface.js';

@injectable()
export default class RabbitClientService implements RabbitClientInterface {
  constructor(
    @inject(AppComponent.ClientProducerInterface) private readonly producer: ClientProducerInterface,
  ) {}

  public async initialize(rabbitConnectionString: string): Promise<Connection>{
    return await connect(rabbitConnectionString);
  }

  public async produce(routingKey: RabbitRouting, data: Subscriber): Promise<Subscriber> {
    return await this.producer.produceMessages(routingKey, data);
  }
}
