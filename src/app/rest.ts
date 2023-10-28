import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import type { DatabaseClientInterface } from '../core/database-client/mongo-client.interface.js';
import { RabbitClientInterface } from '../core/rabit-client/rabit-client.interface.js';

import type { LoggerInterface } from '../core/logger/logger.interface.js';
import type { ConfigInterface } from '../core/config/config.interface.js';
import type { ControllerInterface } from '../core/controller/controller.interface.js';

import { RestSchema } from '../core/config/rest.schema.js';
import { AppComponent } from '../types/app-component.enum.js';
import { AuthenticateMiddleware } from '../core/middlewares/authenticate.middleware.js';

import { getFullServerPath } from '../core/helpers/common.js';
import { getMongoURI } from '../core/helpers/db.js';

@injectable()
export default class RestApplication {
  private expressApplication: Express;

  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.ConfigInterface) private readonly config: ConfigInterface<RestSchema>,
    @inject(AppComponent.DatabaseClientInterface) private readonly databaseClient: DatabaseClientInterface,
    @inject(AppComponent.RabbitClientInterface) private readonly rabbitClient: RabbitClientInterface,
    @inject(AppComponent.UserController) private readonly userController: ControllerInterface,
    @inject(AppComponent.TrainerController) private readonly trainerController: ControllerInterface,
    @inject(AppComponent.TrainingController) private readonly trainingController: ControllerInterface,
    @inject(AppComponent.OrderController) private readonly orderController: ControllerInterface,
    @inject(AppComponent.FriendController) private readonly friendController: ControllerInterface,
    @inject(AppComponent.BalanceController) private readonly balanceController: ControllerInterface,
    @inject(AppComponent.ReviewController) private readonly reviewController: ControllerInterface,
    @inject(AppComponent.TrainingRequestController) private readonly trainingRequestController: ControllerInterface,
  ) {
    this.expressApplication = express();
  }

  private async _initRabitMQ() {
    this.logger.info('Init RabitMQ...');

    this.rabbitClient.initialize();

    this.logger.info('Init RabitMQ completed');
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

    await this._initRabitMQ().catch((error) => {
      this.logger.error(`Error during notification initialization: ${error.message}`)
    })
  }
}
