import { inject, injectable } from 'inversify';

import { LoggerInterface } from '../logger/logger.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { Connection, Channel, connect } from 'amqplib';
import { RabbitClientInterface } from './rabit-client.interface.js';
import { RabbitRouting } from '../../types/rabbit-routing.enum.js';
import { ClientConsumerInterface } from './consumer/client-consumer.interface.js';
import { ClientProducerInterface } from './producer/client-producer.interface.js';
import EventEmitter from 'events';

@injectable()
export default class RabbitClientService implements RabbitClientInterface {
  private connection!: Connection;
  private producerChannel!: Channel;
  private consumerChannel!: Channel;
  private eventEmitter!: EventEmitter;

  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.ClientConsumerInterface) private readonly consumer: ClientConsumerInterface,
    @inject(AppComponent.ClientProducerInterface) private readonly producer: ClientProducerInterface,
  ) {}

  public async initialize(rabbitConnectionString: string): Promise<void>{
    try{

      this.connection = await connect(rabbitConnectionString);

      this.producerChannel = await this.connection.createChannel();
      this.consumerChannel = await this.connection.createChannel();

      const { queue: replyQueueName } = await this.consumerChannel.assertQueue(
        RabbitRouting.AddTraining,
        { exclusive: true }
      );

      this.eventEmitter = new EventEmitter();

      this.producer.initialize(this.producerChannel, replyQueueName, this.eventEmitter);
      this.consumer.initialize(this.consumerChannel, replyQueueName, this.eventEmitter);

      this.consumer.consumeMessages();

    }catch(error){
      this.logger.error(`[RabbitClientService]: Initialize error: ${error}`);
    }
  }

  public async produce(routingKey: RabbitRouting, data: any): Promise<unknown> {
    return await this.producer.produceMessages(routingKey, data);
  }
}
