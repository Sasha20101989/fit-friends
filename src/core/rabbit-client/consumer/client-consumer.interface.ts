import { Channel } from "amqplib";
import { EventEmitter } from "events";

export interface ClientConsumerInterface {
  initialize(channel: Channel, replyQueueName: string, eventEmitter: EventEmitter): Promise<void>;
  consumeMessages(): Promise<void>;
}
