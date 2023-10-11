export const AppComponent = {
  RestApplication: Symbol.for('RestApplication'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigInterface: Symbol.for('ConfigInterface'),
  DatabaseClientInterface: Symbol.for('DatabaseClientInterface'),
  UserServiceInterface: Symbol.for('UserServiceInterface'),
  UserModel: Symbol.for('UserModel'),
  TrainerServiceInterface: Symbol.for('TrainerServiceInterface'),
  TrainerModel: Symbol.for('TrainerModel'),
  UserController: Symbol.for('UserController'),
} as const;
