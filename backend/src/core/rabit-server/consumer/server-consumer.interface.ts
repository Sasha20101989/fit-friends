import { Channel } from 'amqplib';

export interface ServerConsumerInterface {
  initialize(channel: Channel, replyQueueName: string): Promise<void>;
  consumeMessages(): Promise<void>;
}
