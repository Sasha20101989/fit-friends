import { OrderServiceInterface } from './../../modules/order/order-service.interface';
import { balances, notifications, orders, requests, reviews, trainers, trainings, users } from '../../modules/data-generator/data-generator.js';
import { TrainerServiceInterface } from '../../modules/trainer/trainer-service.interface.js';
import TrainerService from '../../modules/trainer/trainer-service.js';
import { TrainerEntity, TrainerModel } from '../../modules/trainer/trainer.entity.js';
import { UserServiceInterface } from '../../modules/user/user-service.interface.js';
import UserService from '../../modules/user/user-service.js';
import { UserModel } from '../../modules/user/user.entity.js';
import { Trainer } from '../../modules/trainer/types/trainer.interface.js';
import { User } from '../../modules/user/types/user.interface.js';
import ConfigService from '../config/config.service.js';
import MongoClientService from '../database-client/database-client.service.js';
import { DatabaseClientInterface } from '../database-client/mongo-client.interface.js';
import { getMongoURI } from '../helpers/db.js';
import ConsoleLoggerService from '../logger/console.service.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { CliCommandInterface } from './cli-command.interface.js';
import type { TokenServiceInterface } from './../../modules/token/token-service.interface.js';
import { Training } from '../../modules/training/types/training.type.js';
import { TrainingServiceInterface } from '../../modules/training/training-service.interface.js';
import TrainingService from '../../modules/training/training-service.js';
import { TrainingEntity, TrainingModel } from '../../modules/training/training.entity.js';
import { TrainingOrder } from '../../modules/order/types/training-order.type.js';
import { DocumentType } from '@typegoose/typegoose';
import OrderService from '../../modules/order/order-service.js';
import { OrderModel } from '../../modules/order/order.entity.js';
import { SubscriberServiceInterface } from '../../modules/subscriber/subscriber-service.interface.js';
import { RabbitClientInterface } from '../rabbit-client/rabit-client.interface.js';
import { UserBalance } from '../../modules/user/types/user-balance.type.js';
import { BalanceServiceInterface } from '../../modules/balance/balance-service.interface.js';
import BalanceService from '../../modules/balance/balance-service.js';
import { BalanceModel } from '../../modules/balance/balance.entity.js';
import { generateRandomUserId, generateRandomUserOrTrainerId } from '../../modules/data-generator/random.js';
import { RequestServiceInterface } from '../../modules/request/request-service.interface.js';
import RequestService from '../../modules/request/request-service.js';
import { RequestModel } from '../../modules/request/request.entity.js';
import { RequestStatus } from '../../modules/request/types/request-status.enum.js';
import { Request } from '../../modules/request/types/request.type.js';
import { ReviewServiceInterface } from '../../modules/review/review-service.interface.js';
import ReviewService from '../../modules/review/review-service.js';
import { ReviewModel } from '../../modules/review/review.entity.js';
import { Review } from '../../modules/review/types/review.type.js';
import { NotificationServiceInterface } from '../../modules/notification/notification-service.interface.js';
import NotificationService from '../../modules/notification/notification-service.js';
import { NotificationModel } from '../../modules/notification/notification.entity.js';
import { Notification } from '../../modules/notification/types/notification.type.js';
import TokenService from '../../modules/token/token-service.js';
import { TokenModel } from '../../modules/token/token.entity.js';

const DEFAULT_USER_PASSWORD = '123456';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private userService!: UserServiceInterface;
  private trainerService!: TrainerServiceInterface;
  private trainingService!: TrainingServiceInterface;
  private subscriberService!: SubscriberServiceInterface;
  private rabbitClient!: RabbitClientInterface;
  private orderService!: OrderServiceInterface;
  private balanceService!: BalanceServiceInterface;
  private requestService!: RequestServiceInterface;
  private reviewService!: ReviewServiceInterface;
  private notificationService!: NotificationServiceInterface;
  private databaseService!: DatabaseClientInterface;
  private tokenService!: TokenServiceInterface;
  private logger: LoggerInterface;
  private configService: ConfigService;
  private saltRounds!: number;

  constructor() {
    this.logger = new ConsoleLoggerService();
    this.configService = new ConfigService(this.logger);
    this.tokenService = new TokenService(this.logger, this.configService, TokenModel);
    this.userService = new UserService(UserModel, TrainerModel, this.tokenService);
    this.trainerService = new TrainerService(this.tokenService, TrainerModel);
    this.trainingService = new TrainingService(this.logger, TrainingModel, this.subscriberService, this.rabbitClient);
    this.orderService = new OrderService(OrderModel, this.trainingService);
    this.databaseService = new MongoClientService(this.logger);
    this.balanceService = new BalanceService(BalanceModel);
    this.requestService = new RequestService(this.logger, RequestModel);
    this.reviewService = new ReviewService(this.logger, ReviewModel, TrainingModel);
    this.notificationService = new NotificationService(NotificationModel);
  }

  private async saveNotification(notification: Notification) {
    await this.notificationService.create({...notification});
  }

  private async saveReview(review: Review, trainingId: string, userId: string) {
    await this.reviewService.create({...review}, trainingId, userId);
  }

  private async saveRequest(request: Request, initiatorId: string, userId: string, requestStatus: RequestStatus) {
    await this.requestService.create({...request}, initiatorId, userId, requestStatus);
  }

  private async saveUser(user: User) {
    const result = await this.userService.create({
      ...user,
      password: DEFAULT_USER_PASSWORD
    }, this.saltRounds);

    if(!result.user){
      throw new Error('Failed to create trainer');
    }
    return result.user;
  }

  private async saveBalance(balance: UserBalance, trainingId: string, userId: string) {
    await this.balanceService.create({...balance}, userId, trainingId);
  }

  private async saveTrainer(trainer: Trainer): Promise<DocumentType<TrainerEntity>> {
    const result = await this.trainerService.create({
      ...trainer,
      password: DEFAULT_USER_PASSWORD
    }, this.saltRounds);

    if(!result.user){
      throw new Error('Failed to create trainer');
    }

    return result.user;
  }

  private async saveTraining(training: Training, trainerId: string): Promise<DocumentType<TrainingEntity>> {
    return await this.trainingService.create({...training, trainer: trainerId});
  }

  private async saveOrder(order: TrainingOrder, trainingId: string, userId: string) {
    const training = await this.trainingService.findById(trainingId);
    if(training){
      await this.orderService.create({...order}, training, userId);
    }
  }

  private async generateAndSaveUsers(): Promise<string[]> {
    const userIds: string[] = [];

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const result = await this.saveUser(user);
      userIds.push(result.id);
    }

    this.logger.info('All users have been generated and saved.');
    return userIds;
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

  private async generateAndSaveOrders(trainingIds: string[], userIds: string[]): Promise<void> {
    const promises: Promise<void>[] = [];

    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      const trainingId = trainingIds[i % trainingIds.length];
      const userId = userIds[i % userIds.length];

      await this.saveOrder(order, trainingId, userId);

      promises.push(Promise.resolve());
    }

    await Promise.all(promises);

    this.logger.info('All orders have been generated and saved.');
  }

  private async generateAndSaveBalances(trainingIds: string[], userIds: string[]): Promise<void> {
    const promises: Promise<void>[] = [];

    for (let i = 0; i < balances.length; i++) {
      const balance = balances[i];
      const trainingId = trainingIds[i % trainingIds.length];
      const userId = userIds[i % userIds.length];

      await this.saveBalance(balance, trainingId, userId);

      promises.push(Promise.resolve());
    }

    await Promise.all(promises);

    this.logger.info('All balances have been generated and saved.');
  }

  private async generateAndSaveRequests(trainerIds: string[], userIds: string[]): Promise<void> {
    const promises: Promise<void>[] = [];
    const usedPairs: Set<string> = new Set();

    for (const request of requests) {
      let initiatorId: string;
      let userId: string;
      let pairKey: string;

      do {
        initiatorId = generateRandomUserId(userIds);
        userId = generateRandomUserOrTrainerId([...trainerIds, ...userIds]);
        pairKey = `${initiatorId}-${userId}`;
      } while (usedPairs.has(pairKey));

      usedPairs.add(pairKey);

      await this.saveRequest(request, initiatorId, userId, request.status);

      promises.push(Promise.resolve());
    }

    await Promise.all(promises);

    this.logger.info('All requests have been generated and saved.');
  }

  private async generateAndSaveReviews(trainingIds: string[], userIds: string[]): Promise<void> {
    const promises: Promise<void>[] = [];

    for (let i = 0; i < reviews.length; i++) {
      const review = reviews[i];
      const trainingId = trainingIds[i % trainingIds.length];
      const userId = userIds[i % userIds.length];

      await this.saveReview(review, trainingId, userId);

      promises.push(Promise.resolve());
    }

    await Promise.all(promises);

    this.logger.info('All reviews have been generated and saved.');
  }

  private async generateAndSaveNotifications(userIds: string[]): Promise<void> {
    const promises: Promise<void>[] = [];

    for (let i = 0; i < notifications.length; i++) {
      const notification = notifications[i];
      const userId = userIds[i % userIds.length];
      notification.user = userId;
      await this.saveNotification(notification);

      promises.push(Promise.resolve());
    }

    await Promise.all(promises);

    this.logger.info('All notifications have been generated and saved.');
  }

  public async execute(login: string, password: string, host: string, dbname: string, saltRounds: string): Promise<void> {
    const defaulDbPort = this.configService.get('DB_PORT');
    const uri = getMongoURI(login, password, host, defaulDbPort, dbname);
    this.saltRounds = parseInt(saltRounds, this.configService.get('SALT_ROUNDS'));

    await this.databaseService.connect(uri);


    try{
      const userIds = await this.generateAndSaveUsers();
      const trainerIds = await this.generateAndSaveTrainers();
      const trainingIds = await this.generateAndSaveTrainings(trainerIds);
      await this.generateAndSaveOrders(trainingIds, userIds);
      await this.generateAndSaveBalances(trainingIds, userIds);
      await this.generateAndSaveRequests(trainingIds, userIds);
      await this.generateAndSaveReviews(trainingIds, userIds);
      await this.generateAndSaveNotifications(userIds);
    }catch(exception){
      this.logger.info(`User generation failed with an error: ${exception}`);
    }
  }
}
