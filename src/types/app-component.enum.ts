export const AppComponent = {
  RestApplication: Symbol.for('RestApplication'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigInterface: Symbol.for('ConfigInterface'),
  DatabaseClientInterface: Symbol.for('DatabaseClientInterface'),
  UserServiceInterface: Symbol.for('UserServiceInterface'),
  UserModel: Symbol.for('UserModel'),
  UserController: Symbol.for('UserController'),
  TrainerServiceInterface: Symbol.for('TrainerServiceInterface'),
  TrainerModel: Symbol.for('TrainerModel'),
  TrainerController: Symbol.for('TrainerController'),
  TokenServiceInterface: Symbol.for('TokenServiceInterface'),
  TokenModel: Symbol.for('TokenModel'),
} as const;
