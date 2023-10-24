import { OrderServiceInterface } from './../../modules/order/order-service.interface';
import { orders, trainers, trainings, users } from '../../modules/data-generator/data-generator.js';
import { TrainerServiceInterface } from '../../modules/trainer/trainer-service.interface.js';
import TrainerService from '../../modules/trainer/trainer-service.js';
import { TrainerEntity, TrainerModel } from '../../modules/trainer/trainer.entity.js';
import { UserServiceInterface } from '../../modules/user/user-service.interface.js';
import UserService from '../../modules/user/user-service.js';
import { UserModel } from '../../modules/user/user.entity.js';
import { Trainer } from '../../types/trainer.interface.js';
import { User } from '../../types/user.interface.js';
import ConfigService from '../config/config.service.js';
import MongoClientService from '../database-client/database-client.service.js';
import { DatabaseClientInterface } from '../database-client/mongo-client.interface.js';
import { getMongoURI } from '../helpers/db.js';
import ConsoleLoggerService from '../logger/console.service.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { CliCommandInterface } from './cli-command.interface.js';
import type { TokenServiceInterface } from './../../modules/token/token-service.interface.js';
import { Training } from '../../types/training.type.js';
import { TrainingServiceInterface } from '../../modules/training/training-service.interface.js';
import TrainingService from '../../modules/training/training-service.js';
import { TrainingEntity, TrainingModel } from '../../modules/training/training.entity.js';
import { TrainingOrder } from '../../types/training-order.type.js';
import { DocumentType } from '@typegoose/typegoose';
import OrderService from '../../modules/order/order-service.js';
import { OrderModel } from '../../modules/order/order.entity.js';

const DEFAULT_USER_PASSWORD = '123456';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private userService!: UserServiceInterface;
  private trainerService!: TrainerServiceInterface;
  private trainingService!: TrainingServiceInterface;
  private orderService!: OrderServiceInterface;
  private databaseService!: DatabaseClientInterface;
  private logger: LoggerInterface;
  private configService: ConfigService;
  private salt!: string;

  constructor(tokenService: TokenServiceInterface) {

    this.logger = new ConsoleLoggerService();
    this.configService = new ConfigService(this.logger);
    this.userService = new UserService(UserModel, tokenService);
    this.trainerService = new TrainerService(tokenService, TrainerModel);
    this.trainingService = new TrainingService(this.logger, TrainingModel);
    this.orderService = new OrderService(this.logger, OrderModel, this.trainingService);
    this.databaseService = new MongoClientService(this.logger);
  }

  private async saveUser(user: User) {
    await this.userService.create({
      ...user,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);
  }

  private async saveTrainer(trainer: Trainer): Promise<DocumentType<TrainerEntity>> {
    const result = await this.trainerService.create({
      ...trainer,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    if(!result.user){
      throw new Error('Failed to create trainer');
    }

    return result.user;
  }

  private async saveTraining(training: Training, trainerId: string): Promise<DocumentType<TrainingEntity>> {
    return await this.trainingService.create({...training, trainer: trainerId});
  }

  private async saveOrder(order: TrainingOrder, trainingId: string) {
    await this.orderService.create({...order, training: trainingId});
  }

  private async generateAndSaveUsers() {
    const promises: Promise<void>[] = [];

    for (let i = 0; i < users.length; i++) {
      const user = users[i];

      const savePromise = this.saveUser(user);

      promises.push(savePromise);
    }

    await Promise.all(promises);

    this.logger.info('All users have been generated and saved.');
  }

  private async generateAndSaveTrainers(): Promise<string[]> {
    const trainerIds: string[] = [];

    for (let i = 0; i < trainers.length; i++) {
      const trainer = trainers[i];
      const result = await this.saveTrainer(trainer);
      trainerIds.push(result.id);
    }

    this.logger.info('All trainers have been generated and saved.');
    return trainerIds;
  }

  private async generateAndSaveTrainings(trainerIds: string[]): Promise<string[]> {
    const trainingIds: string[] = [];

    for (let i = 0; i < trainings.length; i++) {
      const training = trainings[i];
      const trainerId = trainerIds[i % trainerIds.length];
      const result = await this.saveTraining(training, trainerId);
      trainingIds.push(result.id);
    }

    this.logger.info('All trainings have been generated and saved.');

    return trainingIds;
  }

  private async generateAndSaveOrders(trainingIds: string[]): Promise<void> {
    const promises: Promise<void>[] = [];

    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      const trainingId = trainingIds[i % trainingIds.length];

      await this.saveOrder(order, trainingId);

      promises.push(Promise.resolve());
    }

    await Promise.all(promises);

    this.logger.info('All orders have been generated and saved.');
  }

  public async execute(login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const defaulDbPort = this.configService.get('DB_PORT');
    const uri = getMongoURI(login, password, host, defaulDbPort, dbname);
    this.salt = salt;

    await this.databaseService.connect(uri);

    try{
      await this.generateAndSaveUsers();
      const trainerIds = await this.generateAndSaveTrainers();
      const trainingIds = await this.generateAndSaveTrainings(trainerIds);
      await this.generateAndSaveOrders(trainingIds);
    }catch(exception){
      this.logger.info(`User generation failed with an error: ${exception}`);
    }
  }
}
