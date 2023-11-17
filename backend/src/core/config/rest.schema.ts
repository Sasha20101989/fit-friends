import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type RestSchema = {
  PORT: number;
  SALT: string;
  SALT_ROUNDS: number;
  DB_HOST: string;
  MONGO_INITDB_ROOT_USERNAME: string;
  MONGO_INITDB_ROOT_PASSWORD: string;
  DB_PORT: string;
  DB_NAME: string;
  JWT_ACCESS_SECRET:string;
  JWT_REFRESH_SECRET:string;
  ACCESS_TOKEN_EXPIRATION_TIME: string;
  REFRESH_TOKEN_EXPIRATION_TIME: string;
  HOST: string;
  STATIC_DIRECTORY_PATH:string;
  UPLOAD_DIRECTORY: string;
  NOTIFY_PORT: string;
  NOTIFY_MONGO_HOST: string;
  NOTIFY_MONGO_PORT: string;
  NOTIFY_MONGO_DB_NAME: string;
  NOTIFY_MONGO_INITDB_ROOT_USERNAME: string;
  NOTIFY_MONGO_INITDB_ROOT_PASSWORD: string;
  NOTIFY_MONGO_AUTH_BASE: string;
  RABBIT_HOST: string;
  RABBIT_USER: string;
  RABBIT_PASSWORD: string;
  RABBIT_PORT: string;
  RABBIT_QUEUE: string;
  MAIL_SMTP_HOST: string;
  MAIL_SMTP_PORT: string;
  MAIL_USER_NAME: string;
  MAIL_USER_PASSWORD: string;
  MAIL_FROM: string;
}

export const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: null
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: null
  },
  SALT_ROUNDS: {
    doc: 'Salt rounds for password hash',
    format: Number,
    env: 'SALT_ROUNDS',
    default: null
  },
  DB_HOST: {
    doc: 'IP address of the database server (MongoDB)',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: null
  },
  MONGO_INITDB_ROOT_USERNAME: {
    doc: 'Username to connect to the database',
    format: String,
    env: 'MONGO_INITDB_ROOT_USERNAME',
    default: null,
  },
  MONGO_INITDB_ROOT_PASSWORD: {
    doc: 'Password to connect to the database',
    format: String,
    env: 'MONGO_INITDB_ROOT_PASSWORD',
    default: null,
  },
  DB_PORT: {
    doc: 'Port to connect to the database (MongoDB)',
    format: 'port',
    env: 'DB_PORT',
    default: '27017',
  },
  DB_NAME: {
    doc: 'Database name (MongoDB)',
    format: String,
    env: 'DB_NAME',
    default: null
  },
  JWT_ACCESS_SECRET: {
    doc: 'Secret for sign JWT',
    format: String,
    env: 'JWT_ACCESS_SECRET',
    default: null
  },
  JWT_REFRESH_SECRET: {
    doc: 'Secret for refresh JWT ACCESS TOKEN',
    format: String,
    env: 'JWT_REFRESH_SECRET',
    default: null
  },
  ACCESS_TOKEN_EXPIRATION_TIME: {
    doc: 'Time duration for token expiration',
    format: String,
    env: 'ACCESS_TOKEN_EXPIRATION_TIME',
    default: null
  },
  REFRESH_TOKEN_EXPIRATION_TIME: {
    doc: 'Time duration for token expiration',
    format: String,
    env: 'REFRESH_TOKEN_EXPIRATION_TIME',
    default: null
  },
  HOST: {
    doc: 'Host wrere started service',
    format: String,
    env: 'HOST',
    default: 'localhost'
  },
  STATIC_DIRECTORY_PATH: {
    doc: 'Path to directory with static files',
    format: String,
    env: 'STATIC_DIRECTORY_PATH',
    default: null
  },
  UPLOAD_DIRECTORY: {
    doc: 'Directory for upload files',
    format: String,
    env: 'UPLOAD_DIRECTORY',
    default: null
  },
  NOTIFY_PORT:{
    doc: 'Port for notification connections',
    format: 'port',
    env: 'NOTIFY_PORT',
    default: null
  },
  NOTIFY_MONGO_HOST:{
    doc: 'Host wrere started notify service',
    format: String,
    env: 'NOTIFY_MONGO_HOST',
    default: 'localhost'
  },
  NOTIFY_MONGO_PORT: {
    doc: 'Port to connect to the database (MongoDB)',
    format: 'port',
    env: 'NOTIFY_MONGO_PORT',
    default: '27017',
  },
  NOTIFY_MONGO_DB_NAME: {
    doc: 'Database name (MongoDB)',
    format: String,
    env: 'NOTIFY_MONGO_DB_NAME',
    default: null
  },
  NOTIFY_MONGO_INITDB_ROOT_USERNAME: {
    doc: 'Username to connect to the database',
    format: String,
    env: 'NOTIFY_MONGO_INITDB_ROOT_USERNAME',
    default: null,
  },
  NOTIFY_MONGO_INITDB_ROOT_PASSWORD: {
    doc: 'Password to connect to the database',
    format: String,
    env: 'NOTIFY_MONGO_INITDB_ROOT_PASSWORD',
    default: null,
  },
  NOTIFY_MONGO_AUTH_BASE: {
    doc: 'User to connect to the database',
    format: String,
    env: 'NOTIFY_MONGO_AUTH_BASE',
    default: null,
  },
  RABBIT_HOST:{
    doc: 'Host wrere started rabit service',
    format: String,
    env: 'RABBIT_HOST',
    default: 'localhost'
  },
  RABBIT_USER: {
    doc: 'Username to connect to the rabit',
    format: String,
    env: 'RABBIT_USER',
    default: null,
  },
  RABBIT_PASSWORD: {
    doc: 'Password to connect to the rabit',
    format: String,
    env: 'RABBIT_PASSWORD',
    default: null,
  },
  RABBIT_PORT: {
    doc: 'Port to connect to the rabit',
    format: 'port',
    env: 'RABBIT_PORT',
    default: '5672',
  },
  RABBIT_QUEUE: {
    doc: '',
    format: String,
    env: 'RABBIT_QUEUE',
    default: null,
  },
  MAIL_SMTP_HOST: {
    doc: 'Host wrere started smtp service',
    format: String,
    env: 'MAIL_SMTP_HOST',
    default: 'localhost'
  },
  MAIL_SMTP_PORT: {
    doc: 'Port to connect to the smtp',
    format: 'port',
    env: 'MAIL_SMTP_PORT',
    default: '8025',
  },
  MAIL_USER_NAME: {
    doc: 'Username to connect to the smtp',
    format: String,
    env: 'MAIL_USER_NAME',
    default: null,
  },
  MAIL_USER_PASSWORD: {
    doc: 'Password to connect to the smtp',
    format: String,
    env: 'MAIL_USER_PASSWORD',
    default: null,
  },
  MAIL_FROM: {
    doc: 'Email for sending letters',
    format: String,
    env: 'MAIL_FROM',
    default: null,
  },
});
