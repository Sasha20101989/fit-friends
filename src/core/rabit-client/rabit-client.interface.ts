import { RabbitRouting } from '../../types/rabbit-routing.enum.js';

export interface RabbitClientInterface {
  initialize(rabbitConnectionString: string): Promise<void>;
  produce(routingKey: RabbitRouting, data: any): Promise<unknown>;
}
