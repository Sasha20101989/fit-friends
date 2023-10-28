import { inject, injectable } from 'inversify';

import { LoggerInterface } from '../logger/logger.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { Connection, Channel, connect } from 'amqplib';
import { ConfigInterface } from '../config/config.interface.js';
import { RestSchema } from '../config/rest.schema.js';
import { RabbitServerInterface } from './rabit-server.interface.js';
import { ServerConsumerInterface } from './consumer/server-consumer.interface.js';
import { ServerProducerInterface } from './producer/server-producer.interface.js';

@injectable()
export default class RabbitServerService implements RabbitServerInterface {
  private connection!: Connection;
  private producerChannel!: Channel;
  private consumerChannel!: Channel;

  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.ConfigInterface) private readonly config: ConfigInterface<RestSchema>,
    @inject(AppComponent.ServerConsumerInterface) private readonly consumer: ServerConsumerInterface,
    @inject(AppComponent.ServerProducerInterface) private readonly producer: ServerProducerInterface,
  ) {}

  public async initialize(rabbitConnectionString: string): Promise<void>{
    try{
      this.connection = await connect(rabbitConnectionString);

      this.producerChannel = await this.connection.createChannel();
      this.consumerChannel = await this.connection.createChannel();

      const { queue: rpcQueue } = await this.consumerChannel.assertQueue(
        this.config.get('RABIT_QUEUE'),
        { exclusive: true }
      );

      this.producer.initialize(this.producerChannel);
      this.consumer.initialize(this.consumerChannel, rpcQueue);

      this.consumer.consumeMessages();

    }catch(error){
      this.logger.error(`[RabbitServerService]: Initialize error: ${error}`);
    }
  }

  public async produce(correlationId: string, data: any, replyToQueue: string): Promise<void> {
    return await this.producer.produceMessages(correlationId, data, replyToQueue);
  }

  public async handle(operation: string, data: any, correlationId: string, replyTo: string): Promise<void>{
    let responce = {};
    const { type, message } = data;

    console.log('Operation is', operation, correlationId, replyTo);

    switch (operation){
      case '':
        responce = {type, message}
        break;
      default:
        responce = 0;
        break;
    }

    await this.produce(correlationId, responce, replyTo);
  }
}
