import { inject, injectable } from 'inversify';

import { LoggerInterface } from '../logger/logger.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { Connection, Channel, connect } from 'amqplib';
import { RabbitClientInterface } from './rabit-client.interface.js';
import { ConfigInterface } from '../config/config.interface.js';
import { RestSchema } from '../config/rest.schema.js';
import { getRabbitMQConnectionString } from '../helpers/index.js';
import { RabbitRouting } from '../../types/rabbit-routing.enum.js';
import { ClientConsumerInterface } from './consumer/client-consumer.interface.js';
import { ClientProducerInterface } from './producer/client-producer.interface.js';

@injectable()
export default class RabbitClientService implements RabbitClientInterface {
  private connection: Connection | null = null;
  private producerChannel: Channel | null = null;
  private consumerChannel: Channel | null = null;

  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.ConfigInterface) private readonly config: ConfigInterface<RestSchema>,
    @inject(AppComponent.ClientConsumerInterface) private readonly consumer: ClientConsumerInterface,
    @inject(AppComponent.ClientProducerInterface) private readonly producer: ClientProducerInterface,
  ) {}

  public async initialize(): Promise<void>{
    try{
      const rabbitConnectionString = getRabbitMQConnectionString(
        this.config.get('RABIT_USER'),
        this.config.get('RABIT_PASSWORD'),
        this.config.get('RABIT_HOST'),
        this.config.get('RABIT_PORT')
      );
      this.connection = await connect(rabbitConnectionString);

      this.producerChannel = await this.connection.createChannel();
      this.consumerChannel = await this.connection.createChannel();

      const { queue: replyQueueName } = await this.consumerChannel.assertQueue(
        RabbitRouting.AddTraining,
        { exclusive: true }
      );

      this.producer.initialize(this.producerChannel, replyQueueName);
      this.consumer.initialize(this.consumerChannel, replyQueueName);

      this.consumer.consumeMessages();

    }catch(error){
      this.logger.error(`[RabbitClientService]: Initialize error: ${error}`);
    }
  }

  public async produce(routingKey: RabbitRouting, data: any): Promise<void> {
    if(!this.producer){
      this.logger.error('[RabbitClientService]: Client producer not initialized');
      this.logger.info('Try to init RabbitMQ...');
      await this.initialize();
      this.logger.info('Init RabbitMQ completed');
    }

    return await this.producer.produceMessages(routingKey, data);
  }
}
