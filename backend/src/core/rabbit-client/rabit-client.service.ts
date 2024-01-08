import { inject, injectable } from 'inversify';
import { AppComponent } from '../../types/common/app-component.enum.js';
import { Connection, connect } from 'amqplib';
import { RabbitClientInterface } from './rabit-client.interface.js';
import { RabbitRouting } from '../../types/rabbit-routing.enum.js';
import { ClientProducerInterface } from './producer/client-producer.interface.js';
import { Subscriber } from '../../modules/subscriber/types/subscriber.interface.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { RETRY_COUNT, RETRY_TIMEOUT_RABITMQ } from '../database-client/database-client.const.js';

@injectable()
export default class RabbitClientService implements RabbitClientInterface {
  private isConnected = false;
  private connection!: Connection;

  constructor(
    @inject(AppComponent.ClientProducerInterface) private readonly producer: ClientProducerInterface,
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface
  ) {}

  public async initialize(rabbitConnectionString: string): Promise<Connection>{
    this.connection = await this.connectToClient(rabbitConnectionString);
    this.logger.info('RabbitMQ client connection established.');
    return this.connection;
  }

  public async produce(routingKey: RabbitRouting, data: Subscriber): Promise<Subscriber> {
    return await this.producer.produceMessages(routingKey, data);
  }

  private async connectToClient(uri: string): Promise<Connection> {
    if (this.isConnected) {
      this.logger.info(`RabbitMQ client already connected to ${uri}, reusing the connection.`);
      return this.connection;
    }

    this.logger.info(`Trying to connect to to ${uri} RabbitMQ client`);
    return await this._connect(uri);
  }

  private async _connect(uri: string): Promise<Connection> {
    try {
      const instance = await this._connectWithRetry(uri);
      this.connection = instance;
      this.isConnected = true;
      return instance;
    } catch (error) {
      this.logger.error(`Failed to connect to the ${uri} RabbitMQ client in _connect function ${error}`);
      throw error;
    }
  }

  private _connectWithRetry(uri: string): Promise<Connection> {
    let attempt = 0;

    const tryConnect = async (): Promise<Connection> => {
      if (attempt >= RETRY_COUNT) {
        this.logger.error(`Unable to establish to the ${uri} RabbitMQ client connection after ${attempt} attempts.`);
        throw new Error('Failed to connect to the RabbitMQ client');
      }

      return connect(uri)
        .catch(async (error) => {
          attempt++;
          this.logger.error(`Failed to connect to the ${uri} RabbitMQ client. ${error} Attempt ${attempt}`);
          await new Promise(resolve => setTimeout(resolve, RETRY_TIMEOUT_RABITMQ));
          return tryConnect();
        });
    };

    return tryConnect();
  }
}
