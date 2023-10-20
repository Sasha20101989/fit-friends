import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type RestSchema = {
  PORT: number;
  SALT: string;
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
});
