import { Channel } from "amqplib";

import { RabbitRouting } from "../../../types/rabbit-routing.enum.js";

export interface ClientProducerInterface {
  initialize(channel: Channel, replyQueueName: string): Promise<void>;
  produceMessages(routingKey: RabbitRouting, data: any): Promise<void>;
}
