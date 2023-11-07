import { Channel } from 'amqplib';
import { injectable, inject } from 'inversify';
import { AppComponent } from '../../../types/common/app-component.enum.js';
import { LoggerInterface } from '../../logger/logger.interface.js';
import MessageHandler from '../messageHandler.js';
import { RabbitServerInterface } from '../rabit-server.interface.js';
import { ServerConsumerInterface } from './server-consumer.interface.js';
import { ConfigInterface } from '../../config/config.interface.js';
import { RestSchema } from '../../config/rest.schema.js';

@injectable()
export default class ServerConsumer implements ServerConsumerInterface {
  private channel!: Channel;
  private rpcQueue!: string;

  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.ConfigInterface) private readonly config: ConfigInterface<RestSchema>,
    @inject(AppComponent.RabbitServerInterface) private readonly rabbitServer: RabbitServerInterface,
  ){}

  public async initialize(channel: Channel, rpcQueue: string): Promise<void> {
    this.channel = channel;
    this.rpcQueue = rpcQueue;
  }

  public async consumeMessages(): Promise<void> {
    if(!this.channel){
      this.logger.error('[ServerConsumer]: Channel not initialized');
    }

    this.logger.info('[ServerConsumer]: Ready to consume messages...');

    const messageHandler = new MessageHandler(this.rabbitServer, this.config);

    this.channel.consume(
      this.rpcQueue,
      async (msg) => {
        if(msg){
          const { correlationId, replyTo } = msg.properties;
          const operation = msg.properties.headers.function;

          if(!correlationId || !replyTo){
            this.logger.error('[ServerConsumer]: Missing some properties');
          }

          this.logger.info('[ServerConsumer]: Consumed');

          await messageHandler.handle(
            operation,
            JSON.parse(msg.content.toString()),
            correlationId,
            replyTo
          );
        }else{
          this.logger.warn('[ServerConsumer]: Reply message is null');
        }
      },
      {
        noAck: true,
      }
    );
  }
}
