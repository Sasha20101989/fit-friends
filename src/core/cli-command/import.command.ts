import { trainers, users } from '../../modules/data-generator/data-generator.js';
import { TrainerServiceInterface } from '../../modules/trainer/trainer-service.interface.js';
import TrainerService from '../../modules/trainer/trainer-service.js';
import { TrainerModel } from '../../modules/trainer/trainer.entity.js';
import { TokenModel } from '../../modules/token/token.entity.js';
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

const DEFAULT_USER_PASSWORD = '123456';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private userService!: UserServiceInterface;
  private trainerService!: TrainerServiceInterface;
  private databaseService!: DatabaseClientInterface;
  private logger: LoggerInterface;
  private configService: ConfigService;
  private salt!: string;

  constructor() {
    this.logger = new ConsoleLoggerService();
    this.configService = new ConfigService(this.logger);
    this.userService = new UserService(this.logger, UserModel, TokenModel);
    this.trainerService = new TrainerService(this.logger, TrainerModel);
    this.databaseService = new MongoClientService(this.logger);
  }

  private async saveUser(user: User) {

    await this.userService.create({
      ...user,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);
  }

  private async saveTrainer(trainer: Trainer) {

    await this.trainerService.create({
      ...trainer,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);
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

  private async generateAndSaveTrainers() {
    const promises: Promise<void>[] = [];

    for (let i = 0; i < trainers.length; i++) {
      const trainer = trainers[i];

      const savePromise = this.saveTrainer(trainer);

      promises.push(savePromise);
    }

    await Promise.all(promises);

    this.logger.info('All trainers have been generated and saved.');
  }

  public async execute(login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const defaulDbPort = this.configService.get('DB_PORT');
    const uri = getMongoURI(login, password, host, defaulDbPort, dbname);
    this.salt = salt;

    await this.databaseService.connect(uri);

    try{
      await this.generateAndSaveUsers();
      await this.generateAndSaveTrainers();
    }catch(exception){
      this.logger.info(`User generation failed with an error: ${exception}`);
    }
  }
}
