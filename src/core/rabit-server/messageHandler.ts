import { RabbitRouting } from "../../types/rabbit-routing.enum.js";
import { Subscriber } from "../../types/subscriber.interface.js";
import { RabbitServerInterface } from "./rabit-server.interface.js";
import nodemailer from 'nodemailer';

export default class MessageHandler {
  private rabbitClient!: RabbitServerInterface;

  constructor(rabbitClient: RabbitServerInterface) {
    this.rabbitClient = rabbitClient;
  }

  private async sendEmail(emailData: any){
    try {
      const transporter = nodemailer.createTransport({
        host: 'localhost',
        port: 8025,
        secure: false,
      });

      await transporter.sendMail(emailData);

      console.log('Email sent successfully');
    } catch (error) {
      console.error('Email sending failed:', error);
    }
  };

  async handle(operation: string, data: Subscriber, correlationId: string, replyTo: string) {
    console.log('Operation is', operation, correlationId, replyTo);

    switch (correlationId){
      case RabbitRouting.AddTraining:
        const emailData = {
          from: 'a@felyugin.me',
          to: data.user.email,
          subject: `Hello ${data.user.name}` ,
          date: new Date(),
          text: `
            Hello ${data.user.name}
          `,
        };

        await this.sendEmail(emailData);
        break;
      default:
        break;
    }

    await this.rabbitClient.produce(correlationId, data, replyTo);
  }
}
