import { Channel } from "amqplib";
import { inject, injectable } from "inversify";
import EventEmitter from "events";

import { AppComponent } from "../../../types/app-component.enum.js";
import { LoggerInterface } from "../../logger/logger.interface.js";
import { ClientProducerInterface } from "./client-producer.interface.js";
import { RabbitRouting } from "../../../types/rabbit-routing.enum.js";
import { Subscriber } from "../../../types/subscriber.interface.js";
import { RestSchema } from "../../config/rest.schema.js";
import { ConfigInterface } from "../../config/config.interface.js";

@injectable()
export default class ClientProducer implements ClientProducerInterface {
  private channel!: Channel;
  private replyQueueName!: string;
  private eventEmitter!: EventEmitter;

  constructor(
    @inject(AppComponent.ConfigInterface) private readonly config: ConfigInterface<RestSchema>,
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface
  ){}

  public async initialize(channel: Channel, replyQueueName: string, eventEmitter: EventEmitter): Promise<void> {
    this.channel = channel;
    this.replyQueueName = replyQueueName;
    this.eventEmitter = eventEmitter;
  }

  public async produceMessages(routingKey: RabbitRouting, data: Subscriber){
    this.logger.info('[ClientProducer]: Ready to produce messages...');

    if (!this.channel) {
      this.logger.error('[ClientProducer]: Channel not initialized');
    }

    this.logger.info(`[ClientProducer]: Routing key is ${routingKey}`);

    return new Promise<Subscriber>((resolve, reject) => {
      try{
        this.channel.sendToQueue(
          this.config.get('RABIT_QUEUE'),
          Buffer.from(JSON.stringify(data)),
          {
            replyTo: this.replyQueueName,
            correlationId: routingKey,
            expiration: 10,
            headers: {
              function: routingKey,
            },
          }
        );

        this.eventEmitter.once(routingKey, async (data) => {
          const reply = JSON.parse(data.content.toString());
          resolve(reply);
        });
      }catch(error){
        reject(error)
      }
    });
  }
}
