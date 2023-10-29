import { RabbitRouting } from "../../types/rabbit-routing.enum.js";
import { Subscriber } from "../../types/subscriber.interface.js";
import { RabbitServerInterface } from "./rabit-server.interface.js";

export default class MessageHandler {
  private rabbitClient!: RabbitServerInterface;

  constructor(rabbitClient: RabbitServerInterface) {
    this.rabbitClient = rabbitClient;
  }

  async handle(operation: string, data: Subscriber, correlationId: string, replyTo: string) {
    let response: Subscriber | null;

    console.log('Operation is', operation, correlationId, replyTo);

    switch (correlationId){
      case RabbitRouting.AddTraining:
        response = data
        break;
      default:
        response = null;
        break;
    }

    await this.rabbitClient.produce(correlationId, response, replyTo);
  }
}
