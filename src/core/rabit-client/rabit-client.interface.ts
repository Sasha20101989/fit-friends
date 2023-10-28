import { RabbitRouting } from '../../types/rabbit-routing.enum.js';

export interface RabbitClientInterface {
  initialize(): Promise<void>;
  produce(routingKey: RabbitRouting, data: any): Promise<void>;
}
