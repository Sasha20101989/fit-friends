import { Channel } from "amqplib";

export interface ServerProducerInterface {
  initialize(channel: Channel): Promise<void>;
  produceMessages(correlationId: string, data: any, replyToQueue: string): Promise<void>;
}
