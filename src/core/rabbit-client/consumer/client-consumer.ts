import EventEmitter from 'node:events';
import { Channel } from 'amqplib';
import { injectable, inject } from 'inversify';
import { AppComponent } from '../../../types/common/app-component.enum.js';
import { LoggerInterface } from '../../logger/logger.interface.js';
import { ClientConsumerInterface } from './client-consumer.interface.js';

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
    this.logger.info('[ClientConsumer]: Ready to consume messages...');

    if(!this.channel){
      this.logger.error('[ClientConsumer]: Channel not initialized');
    }

    this.channel.consume(
      this.replyQueueName,
      (message) => {
        this.eventEmitter.emit(
          message?.properties.correlationId.toString(),
          message
        );
      },{
        noAck: true,
      }
    );
  }
}
