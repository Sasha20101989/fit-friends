import { Channel } from "amqplib";
import { inject, injectable } from "inversify";

import { AppComponent } from "../../../types/common/app-component.enum.js";
import { LoggerInterface } from "../../logger/logger.interface.js";
import { ServerProducerInterface } from "./server-producer.interface.js";
import { Subscriber } from "../../../modules/subscriber/types/subscriber.interface.js";

@injectable()
export default class ServerProducer implements ServerProducerInterface {
  private channel!: Channel;

  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
  ){}

  public async initialize(channel: Channel): Promise<void> {
    this.channel = channel;
  }

  public async produceMessages(correlationId: string, data: Subscriber, replyToQueue: string): Promise<void>{
    if(!this.channel){
      this.logger.error('[ServerProducer]: Channel not initialized');
    }

    this.logger.info('[ServerProducer]: Ready to produce messages...');
    this.logger.info(`[ServerProducer]: Correlation id is ${correlationId}`);
    this.logger.info(`[ServerProducer]: Responding with...${JSON.stringify(data)}`);

    this.channel.sendToQueue(
      replyToQueue,
      Buffer.from(JSON.stringify(data)),
      {
        correlationId: correlationId,
      }
    );
  }
}

