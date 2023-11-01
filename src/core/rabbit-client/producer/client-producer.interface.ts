import { Channel } from 'amqplib';
import { EventEmitter } from 'nodemailer/lib/xoauth2/index.js';
import { Subscriber } from '../../../modules/subscriber/types/subscriber.interface.js';
import { RabbitRouting } from '../../../types/rabbit-routing.enum.js';

export interface ClientProducerInterface {
  initialize(channel: Channel, replyQueueName: string, eventEmitter: EventEmitter): Promise<void>;
  produceMessages(routingKey: RabbitRouting, data: Subscriber): Promise<Subscriber>;
}
