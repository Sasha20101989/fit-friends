// import type { DatabaseClientInterface } from '../../core/database-client/mongo-client.interface.js';
// import { getMongoURI } from '../../core/helpers/db.js';

// export default class ImportCommand implements CliCommandInterface {
//   public readonly name = '--import';
//   private userService!: UserServiceInterface;
//   private offerService!: OfferServiceInterface;
//   private databaseService!: DatabaseClientInterface;
//   private logger: LoggerInterface;
//   private configService: ConfigService;
//   private salt!: string;

//   constructor() {
//     this.onLine = this.onLine.bind(this);
//     this.onComplete = this.onComplete.bind(this);

//     this.logger = new ConsoleLoggerService();
//     this.configService = new ConfigService(this.logger);
//     this.userService = new UserService(this.logger, UserModel);
//     this.offerService = new OfferService(this.logger, OfferModel);
//     this.databaseService = new MongoClientService(this.logger);
//   }

//   private async saveOffer(offer: RentalOffer) {

//     const user = await this.userService.findOrCreate({
//       ...offer.user,
//       password: DEFAULT_USER_PASSWORD
//     }, this.salt);

//     const coordinates: CityCoordinates = cityCoordinates[offer.city];

//     await this.offerService.create({
//       ...offer,
//       coordinates,
//       userId: user.id,
//     });
//   }

//   public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
//     const defaulDbPort = this.configService.get('DB_PORT');
//     const uri = getMongoURI(login, password, host, defaulDbPort, dbname);
//     this.salt = salt;

//     await this.databaseService.connect(uri);


//   }
// }
