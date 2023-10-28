import { Channel, ConsumeMessage } from "amqplib";
import { ServerConsumerInterface } from "./server-consumer.interface.js";
import { inject, injectable } from "inversify";
import { AppComponent } from "../../../types/app-component.enum.js";
import { LoggerInterface } from "../../logger/logger.interface.js";
import { RabbitServerInterface } from "../rabit-server.interface.js";

@injectable()
export default class ServerConsumer implements ServerConsumerInterface {
  private channel!: Channel;
  private rpcQueue!: string;

  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.RabbitServerInterface) private readonly rabbitServer: RabbitServerInterface,
  ){}

  public async initialize(channel: Channel, rpcQueue: string): Promise<void> {
    this.channel = channel;
    this.rpcQueue = rpcQueue;
  }

  public async consumeMessages(): Promise<void> {
    this.logger.info('Ready to consume server messages...');

    if(!this.channel){
      this.logger.error('[ServerConsumer]: Channel not initialized');
    }

    this.channel.consume(
      this.rpcQueue,
      async (message: ConsumeMessage | null) => {
        if(message){
          const { correlationId, replyTo } = message.properties;
          const operation = message.properties.headers.function;

          if(!correlationId || !replyTo){
            this.logger.error('[ServerConsumer]: Missing some properties');
          }

          this.logger.info('Consumed', JSON.parse(message.content.toString()));

          await this.rabbitServer.handle(
            operation,
            JSON.parse(message.content.toString()),
            correlationId,
            replyTo
          );
        }

        this.logger.warn('Reply message is null');
        return null;
      },
      {
        noAck: true,
      }
    );
  }
}
