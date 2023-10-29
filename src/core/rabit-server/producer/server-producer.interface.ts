import { Channel } from "amqplib";
import { Subscriber } from "../../../types/subscriber.interface.js";

export interface ServerProducerInterface {
  initialize(channel: Channel): Promise<void>;
  produceMessages(correlationId: string, data: Subscriber, replyToQueue: string): Promise<void>;
}
