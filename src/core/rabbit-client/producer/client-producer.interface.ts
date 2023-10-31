import { Channel } from "amqplib";

import { RabbitRouting } from "../../../types/rabbit-routing.enum.js";
import EventEmitter from "events";
import { Subscriber } from "../../../modules/subscriber/types/subscriber.interface.js";

export interface ClientProducerInterface {
  initialize(channel: Channel, replyQueueName: string, eventEmitter: EventEmitter): Promise<void>;
  produceMessages(routingKey: RabbitRouting, data: Subscriber): Promise<Subscriber>;
}
