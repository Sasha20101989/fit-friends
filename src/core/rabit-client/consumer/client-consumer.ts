import { Channel, ConsumeMessage } from "amqplib";
import { ClientConsumerInterface } from "./client-consumer.interface.js";
import { inject, injectable } from "inversify";
import { AppComponent } from "../../../types/app-component.enum.js";
import { LoggerInterface } from "../../logger/logger.interface.js";
import EventEmitter from "events";

@injectable()
export default class ClientConsumer implements ClientConsumerInterface {
  private channel!: Channel;
  private replyQueueName!: string;
  private eventEmitter!: EventEmitter;

  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
  ){}

  public async initialize(channel: Channel, replyQueueName: string, eventEmitter: EventEmitter): Promise<void> {
    this.channel = channel;
    this.replyQueueName = replyQueueName;
    this.eventEmitter = eventEmitter;
  }

  public async consumeMessages(): Promise<void> {
    this.logger.info('Ready to consume client messages...');

    if(!this.channel){
      this.logger.error('[ClientConsumer]: Channel not initialized');
    }

    this.channel.consume(this.replyQueueName, (message: ConsumeMessage | null) => {
      if(message){
        this.logger.info('The reply is...', JSON.parse(message.content.toString()));

        this.eventEmitter.emit(
          message.properties.correlationId.toString(),
          message
        );
      }

      this.logger.warn('Reply message is null');
      return null;
    },{
      noAck: true,
    });
  }
}
