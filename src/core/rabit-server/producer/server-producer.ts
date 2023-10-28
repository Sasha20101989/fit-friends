import { Channel } from "amqplib";
import { inject, injectable } from "inversify";

import { AppComponent } from "../../../types/app-component.enum.js";
import { LoggerInterface } from "../../logger/logger.interface.js";
import { ServerProducerInterface } from "./server-producer.interface.js";

@injectable()
export default class ServerProducer implements ServerProducerInterface {
  private channel!: Channel;

  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
  ){}

  public async initialize(channel: Channel): Promise<void> {
    this.channel = channel;
  }

  public async produceMessages(correlationId: string, data: any, replyToQueue: string): Promise<void>{
    this.logger.info('Ready to produce messages...');

    if(!this.channel){
      this.logger.error('[ServerProducer]: Channel not initialized');
    }

    this.logger.info(`Correlation id is ${correlationId}`);
    this.logger.info('Responding with...', data);

    this.channel.sendToQueue(
      replyToQueue,
      Buffer.from(JSON.stringify(data)),
      {
        correlationId: correlationId,
      }
    );
  }
}

