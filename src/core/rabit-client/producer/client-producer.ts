import { Channel } from "amqplib";
import { inject, injectable } from "inversify";

import { AppComponent } from "../../../types/app-component.enum.js";
import { LoggerInterface } from "../../logger/logger.interface.js";
import { ClientProducerInterface } from "./client-producer.interface.js";
import { RabbitRouting } from "../../../types/rabbit-routing.enum.js";
import { ConfigInterface } from "../../config/config.interface.js";
import { RestSchema } from "../../config/rest.schema.js";

@injectable()
export default class ClientProducer implements ClientProducerInterface {
  private channel!: Channel;
  private replyQueueName!: string;

  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.ConfigInterface) private readonly config: ConfigInterface<RestSchema>,

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

    this.logger.info(`Routing key is ${routingKey}`);

    this.channel.sendToQueue(
      this.config.get('RABIT_QUEUE'),
      Buffer.from(JSON.stringify(data)),
      {
        replyTo: this.replyQueueName,
        correlationId: routingKey
      }
    );
  }
}
