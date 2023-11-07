import { Subscriber } from '../../modules/subscriber/types/subscriber.interface.js';
import { RabbitRouting } from '../../types/rabbit-routing.enum.js';
import nodemailer from 'nodemailer';
import { RabbitServerInterface } from './rabit-server.interface.js';
import { EmailData } from './types/email-data.js';
import { ConfigInterface } from '../config/config.interface.js';
import { RestSchema } from '../config/rest.schema.js';

export default class MessageHandler {
  private rabbitClient!: RabbitServerInterface;
  private config: ConfigInterface<RestSchema>;

  constructor(rabbitClient: RabbitServerInterface, config: ConfigInterface<RestSchema>) {
    this.rabbitClient = rabbitClient;
    this.config = config;
  }

  private async sendEmail(emailData: EmailData){
    try {
      const host = this.config.get('MAIL_SMTP_HOST');
      const port = parseInt(this.config.get('MAIL_SMTP_PORT'), 10)
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: false,
      });

      await transporter.sendMail(emailData);

      console.log('Email sent successfully');
    } catch (error) {
      console.error('Email sending failed:', error);
    }
  }

  async handle(operation: string, data: Subscriber, correlationId: string, replyTo: string) {
    console.log('Operation is', operation, correlationId, replyTo);

    let emailData: EmailData;

    switch (correlationId){
      case RabbitRouting.AddTraining:
        emailData = {
          from: this.config.get('MAIL_FROM'),
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
