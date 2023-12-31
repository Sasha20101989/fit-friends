export const AppComponent = {
  RestApplication: Symbol.for('RestApplication'),
  CLIApplication: Symbol.for('CLIApplication'),
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
  TrainingServiceInterface: Symbol.for('TrainingServiceInterface'),
  TrainingModel: Symbol.for('TrainingModel'),
  TrainingController: Symbol.for('TrainingController'),
  OrderServiceInterface: Symbol.for('OrderServiceInterface'),
  OrderModel: Symbol.for('OrderModel'),
  OrderController: Symbol.for('OrderController'),
  FriendServiceInterface: Symbol.for('FriendServiceInterface'),
  FriendController: Symbol.for('FriendController'),
  FriendModel: Symbol.for('FriendModel'),
  BalanceServiceInterface: Symbol.for('BalanceServiceInterface'),
  BalanceController: Symbol.for('BalanceController'),
  BalanceModel: Symbol.for('BalanceModel'),
  ReviewServiceInterface: Symbol.for('ReviewServiceInterface'),
  ReviewController: Symbol.for('ReviewController'),
  ReviewModel: Symbol.for('ReviewModel'),
  RequestServiceInterface: Symbol.for('RequestServiceInterface'),
  RequestController: Symbol.for('RequestController'),
  RequestModel: Symbol.for('RequestModel'),
  SubscriberServiceInterface: Symbol.for('SubscriberServiceInterface'),
  SubscriberController: Symbol.for('SubscriberController'),
  SubscriberModel: Symbol.for('SubscriberModel'),
  RabbitClientInterface: Symbol.for('RabbitClientInterface'),
  ClientConsumerInterface: Symbol.for('ClientConsumerInterface'),
  ClientProducerInterface: Symbol.for('ClientProducerInterface'),
  RabbitServerInterface: Symbol.for('RabbitServerInterface'),
  ServerConsumerInterface: Symbol.for('ServerConsumerInterface'),
  ServerProducerInterface: Symbol.for('ServerProducerInterface'),
  NotificationServiceInterface: Symbol.for('NotificationServiceInterface'),
  NotificationController: Symbol.for('NotificationController'),
  NotificationModel: Symbol.for('NotificationModel'),
  ExceptionFilter: Symbol.for('ExceptionFilter'),
  AuthExceptionFilter: Symbol.for('AuthExceptionFilter'),
  HttpExceptionFilter: Symbol.for('HttpExceptionFilter'),
  ValidationExceptionFilter: Symbol.for('ValidationExceptionFilter'),
} as const;
