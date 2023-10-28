import { Channel } from "amqplib";

import { RabbitRouting } from "../../../types/rabbit-routing.enum.js";
import EventEmitter from "events";

export interface ClientProducerInterface {
  initialize(channel: Channel, replyQueueName: string, eventEmitter: EventEmitter): Promise<void>;
  produceMessages(routingKey: RabbitRouting, data: any): Promise<unknown>;
}
