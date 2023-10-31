import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import type { DatabaseClientInterface } from '../core/database-client/mongo-client.interface.js';
import { RabbitClientInterface } from '../core/rabbit-client/rabit-client.interface.js';

import type { LoggerInterface } from '../core/logger/logger.interface.js';
import type { ConfigInterface } from '../core/config/config.interface.js';
import type { ControllerInterface } from '../core/controller/controller.interface.js';

import { RestSchema } from '../core/config/rest.schema.js';
import { AppComponent } from '../types/common/app-component.enum.js';
import { AuthenticateMiddleware } from '../core/middlewares/authenticate.middleware.js';

import { getFullServerPath } from '../core/helpers/common.js';
import { getMongoURI } from '../core/helpers/db.js';
import { RabbitServerInterface } from '../core/rabit-server/rabit-server.interface.js';
import { getRabbitMQConnectionString } from '../core/helpers/index.js';
import { ServerConsumerInterface } from '../core/rabit-server/consumer/server-consumer.interface.js';
import { ServerProducerInterface } from '../core/rabit-server/producer/server-producer.interface.js';
import EventEmitter from 'events';
import { ClientConsumerInterface } from '../core/rabbit-client/consumer/client-consumer.interface.js';
import { ClientProducerInterface } from '../core/rabbit-client/producer/client-producer.interface.js';
import { RabbitRouting } from '../types/rabbit-routing.enum.js';

@injectable()
export default class RestApplication {
  private expressApplication: Express;

  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.ConfigInterface) private readonly config: ConfigInterface<RestSchema>,
    @inject(AppComponent.DatabaseClientInterface) private readonly databaseClient: DatabaseClientInterface,
    @inject(AppComponent.UserController) private readonly userController: ControllerInterface,
    @inject(AppComponent.TrainerController) private readonly trainerController: ControllerInterface,
    @inject(AppComponent.TrainingController) private readonly trainingController: ControllerInterface,
    @inject(AppComponent.OrderController) private readonly orderController: ControllerInterface,
    @inject(AppComponent.FriendController) private readonly friendController: ControllerInterface,
    @inject(AppComponent.BalanceController) private readonly balanceController: ControllerInterface,
    @inject(AppComponent.ReviewController) private readonly reviewController: ControllerInterface,
    @inject(AppComponent.SubscriberController) private readonly subscriberController: ControllerInterface,
    @inject(AppComponent.TrainingRequestController) private readonly trainingRequestController: ControllerInterface,
    @inject(AppComponent.NotificationController) private readonly notificationController: ControllerInterface,
    @inject(AppComponent.RabbitClientInterface) private readonly rabbitClient: RabbitClientInterface,
    @inject(AppComponent.RabbitServerInterface) private readonly rabbitServer: RabbitServerInterface,
    @inject(AppComponent.ServerConsumerInterface) private readonly serverConsumer: ServerConsumerInterface,
    @inject(AppComponent.ServerProducerInterface) private readonly serverProducer: ServerProducerInterface,
    @inject(AppComponent.ClientConsumerInterface) private readonly clientConsumer: ClientConsumerInterface,
    @inject(AppComponent.ClientProducerInterface) private readonly clientProducer: ClientProducerInterface,
  ) {
    this.expressApplication = express();
  }

  private async _initRabitMQClient() {
    this.logger.info('Init RabbitMQ client...');

    const rabbitConnectionString = getRabbitMQConnectionString(
      this.config.get('RABIT_USER'),
      this.config.get('RABIT_PASSWORD'),
      this.config.get('RABIT_HOST'),
      this.config.get('RABIT_PORT')
    );

    const connection = await this.rabbitClient.initialize(rabbitConnectionString);

    const producerChannel = await connection.createChannel();
    const consumerChannel = await connection.createChannel();

    const { queue: replyQueueName } = await consumerChannel.assertQueue(
      RabbitRouting.AddTraining,
      { exclusive: true }
    );

    const eventEmitter = new EventEmitter();

    this.clientProducer.initialize(producerChannel, replyQueueName, eventEmitter);
    this.clientConsumer.initialize(consumerChannel, replyQueueName, eventEmitter);

    this.clientConsumer.consumeMessages();

    this.logger.info('Init RabbitMQ client completed');
  }

  private async _initRabitMQServer() {
    this.logger.info('Init RabbitMQ server...');

    const rabbitConnectionString = getRabbitMQConnectionString(
      this.config.get('RABIT_USER'),
      this.config.get('RABIT_PASSWORD'),
      this.config.get('RABIT_HOST'),
      this.config.get('RABIT_PORT')
    );

    const connection = await this.rabbitServer.initialize(rabbitConnectionString);

    if(!connection){
      throw new Error('Connection rabbitmq not initialized.');
    }
    const producerChannel = await connection.createChannel();
    const consumerChannel = await connection.createChannel();

    const { queue: rpcQueue } = await consumerChannel.assertQueue(
      this.config.get('RABIT_QUEUE'),
      { exclusive: true }
    );

    this.serverProducer.initialize(producerChannel);
    this.serverConsumer.initialize(consumerChannel, rpcQueue);
    this.serverConsumer.consumeMessages();

    this.logger.info('Init RabbitMQ server completed');
  }

  private async _initDb() {
    this.logger.info('Init database...');

    const mongoUri = getMongoURI(
      this.config.get('MONGO_INITDB_ROOT_USERNAME'),
      this.config.get('MONGO_INITDB_ROOT_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    await this.databaseClient.connect(mongoUri);

    this.logger.info('Init database completed');
  }

  private async _initMiddleware() {
    this.logger.info('Global middleware initialization...');

    this.expressApplication.use(express.json());

    this.expressApplication.use(
      '/upload',
      express.static(this.config.get('UPLOAD_DIRECTORY'))
    );

    this.expressApplication.use(
      '/static',
      express.static(this.config.get('STATIC_DIRECTORY_PATH'))
    );

    const authenticateMiddleware = new AuthenticateMiddleware(this.config.get('JWT_ACCESS_SECRET'));
    this.expressApplication.use(authenticateMiddleware.execute.bind(authenticateMiddleware));

    this.logger.info('Global middleware initialization completed');
  }

  private async _initRoutes() {
    this.logger.info('Controller initialization...');
    this.expressApplication.use(cors());
    this.expressApplication.use(cookieParser());
    this.expressApplication.use('/users', this.userController.router);
    this.expressApplication.use('/trainers', this.trainerController.router);
    this.expressApplication.use('/trainings', this.trainingController.router);
    this.expressApplication.use('/orders', this.orderController.router);
    this.expressApplication.use('/friends', this.friendController.router);
    this.expressApplication.use('/balance', this.balanceController.router);
    this.expressApplication.use('/balance', this.balanceController.router);
    this.expressApplication.use('/reviews', this.reviewController.router);
    this.expressApplication.use('/requests', this.trainingRequestController.router);
    this.expressApplication.use('/subscribes', this.subscriberController.router);
    this.expressApplication.use('/notifications', this.notificationController.router);

    this.logger.info('Controller initialization completed');
  }

  private async _initServer() {
    this.logger.info('Try to init server...');

    const host = this.config.get('HOST');
    const port = this.config.get('PORT');
    this.expressApplication.listen(port);

    this.logger.info(`Server started on ${getFullServerPath(host, port)}`);
  }

  public async init() {
    this.logger.info('Application initialization');

    await this._initDb().catch((error) => {
      this.logger.error(`Error during database initialization: ${error.message}`);
    });

    await this._initMiddleware();

    await this._initRoutes();

    await this._initServer().catch((error) => {
      this.logger.error(`Error server initialization: ${error.message}`);
    });

    await this._initRabitMQClient().catch((error) => {
      this.logger.error(`Error during rabbitMq client initialization: ${error.message}`)
    })

    await this._initRabitMQServer().catch((error) => {
      this.logger.error(`Error during rabbitMq server initialization: ${error.message}`)
    })
  }
}
