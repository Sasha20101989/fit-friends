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
  BalanceServiceInterface: Symbol.for('BalanceServiceInterface'),
  BalanceController: Symbol.for('BalanceController'),
  BalanceModel: Symbol.for('BalanceModel'),
  ReviewServiceInterface: Symbol.for('ReviewServiceInterface'),
  ReviewController: Symbol.for('ReviewController'),
  ReviewModel: Symbol.for('ReviewModel'),
  TrainingRequestServiceInterface: Symbol.for('TrainingRequestServiceInterface'),
  TrainingRequestController: Symbol.for('TrainingRequestController'),
  TrainingRequestModel: Symbol.for('TrainingRequestModel'),
  SubscriberServiceInterface: Symbol.for('SubscriberServiceInterface'),
  SubscriberController: Symbol.for('SubscriberController'),
  SubscriberModel: Symbol.for('SubscriberModel'),
  RabbitClientInterface: Symbol.for('RabbitClientInterface'),
  ClientConsumerInterface: Symbol.for('ClientConsumerInterface'),
  ClientProducerInterface: Symbol.for('ClientProducerInterface'),
  RabbitServerInterface: Symbol.for('RabbitServerInterface'),
  ServerConsumerInterface: Symbol.for('ServerConsumerInterface'),
  ServerProducerInterface: Symbol.for('ServerProducerInterface')
} as const;
