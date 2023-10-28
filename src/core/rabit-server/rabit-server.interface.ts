export interface RabbitServerInterface {
  initialize(rabbitConnectionString: string): Promise<void>;
  produce(correlationId: string, data: any, replyToQueue: string): Promise<void>;
  handle(operation: string, data: any, correlationId: string, replyTo: string): Promise<void>;
}
