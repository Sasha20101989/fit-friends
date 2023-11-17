import { Connection } from 'amqplib';
import { Subscriber } from '../../modules/subscriber/types/subscriber.interface.js';

export interface RabbitServerInterface {
  initialize(rabbitConnectionString: string): Promise<Connection | undefined>;
  produce(correlationId: string, data: Subscriber | null, replyToQueue: string): Promise<void>;
}
