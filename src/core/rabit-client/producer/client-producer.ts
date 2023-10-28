import { Channel } from "amqplib";
import { inject, injectable } from "inversify";

import { AppComponent } from "../../../types/app-component.enum.js";
import { LoggerInterface } from "../../logger/logger.interface.js";
import { ClientProducerInterface } from "./client-producer.interface.js";
import { RabbitRouting } from "../../../types/rabbit-routing.enum.js";

@injectable()
export default class ClientProducer implements ClientProducerInterface {
  private channel!: Channel;
  private replyQueueName!: string;

  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
  ){}

  public async initialize(channel: Channel, replyQueueName: string): Promise<void> {
    this.channel = channel;
    this.replyQueueName = replyQueueName;
  }

  public async produceMessages(routingKey: RabbitRouting, data: any){
    this.logger.info('Ready to produce messages...');

    if(!this.channel){
      this.logger.error('[ClientProducer]: Channel not initialized');
    }

    this.channel.sendToQueue(
      'fit-friends.notify',
      Buffer.from(JSON.stringify(data)),
      {
        replyTo: this.replyQueueName,
        correlationId: routingKey
      }
    );
  }
}
