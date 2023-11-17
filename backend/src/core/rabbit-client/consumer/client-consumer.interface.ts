import EventEmitter from 'node:events';
import { Channel } from 'amqplib';

export interface ClientConsumerInterface {
  initialize(channel: Channel, replyQueueName: string, eventEmitter: EventEmitter): Promise<void>;
  consumeMessages(): Promise<void>;
}
