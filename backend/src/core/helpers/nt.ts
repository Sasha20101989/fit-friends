export const getRabbitMQConnectionString = (
  user: string,
  password: string,
  host: string,
  port: string
): string => `amqp://${user}:${password}@${host}:${port}`;
