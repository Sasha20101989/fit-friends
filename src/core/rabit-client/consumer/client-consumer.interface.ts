import { Channel } from "amqplib";

export interface ClientConsumerInterface {
  initialize(channel: Channel, replyQueueName: string): Promise<void>;
  consumeMessages(): Promise<void>;
}
