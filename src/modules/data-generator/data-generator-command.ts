import type { DatabaseClientInterface } from '../../core/database-client/mongo-client.interface.js';
import type{ LoggerInterface } from '../../core/logger/logger.interface.js';
import type{ UserServiceInterface } from '../user/user-service.interface.js';
import type { User } from '../../types/user.interface.js';

import { getMongoURI } from '../../core/helpers/db.js';
import ConfigService from '../../core/config/config.service.js';
import ConsoleLoggerService from '../../core/logger/console.service.js';
import UserService from '../user/user-service.js';
import { UserModel } from '../user/user.entity.js';
import MongoClientService from '../../core/database-client/database-client.service.js';

import { generateRandomUser } from './data-generator.js';

const COUNT_GENERATED_USERS = 10;
const DEFAULT_USER_PASSWORD = '123456';

export default class DataGeneratorCommand {
  private userService!: UserServiceInterface;
  private databaseService!: DatabaseClientInterface;
  private logger: LoggerInterface;
  private configService: ConfigService;
  private salt!: string;

  constructor() {
    this.logger = new ConsoleLoggerService();
    this.configService = new ConfigService(this.logger);
    this.userService = new UserService(this.logger, UserModel);
    this.databaseService = new MongoClientService(this.logger);
  }

  private async saveUser(user: User) {

    await this.userService.findOrCreate({
      ...user,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);
  }

  private async generateAndSaveUsers() {
    const promises: Promise<void>[] = [];

    for (let i = 0; i < COUNT_GENERATED_USERS; i++) {
      const randomUser = generateRandomUser();

      const savePromise = this.saveUser(randomUser);

      promises.push(savePromise);
    }

    await Promise.all(promises);

    this.logger.info('All users have been generated and saved.');
  }

  public async execute(login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const defaulDbPort = this.configService.get('DB_PORT');
    const uri = getMongoURI(login, password, host, defaulDbPort, dbname);
    this.salt = salt;

    await this.databaseService.connect(uri);

    try{
      await this.generateAndSaveUsers()
    }catch(exception){
      this.logger.info(`User generation failed with an error: ${exception}`);
    }
  }
}
