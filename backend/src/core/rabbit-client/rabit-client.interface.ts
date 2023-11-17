import { Connection } from 'amqplib';
import { RabbitRouting } from '../../types/rabbit-routing.enum.js';
import { Subscriber } from '../../modules/subscriber/types/subscriber.interface.js';

export interface RabbitClientInterface {
  initialize(rabbitConnectionString: string): Promise<Connection>;
  produce(routingKey: RabbitRouting, data: Subscriber): Promise<Subscriber>;
}
