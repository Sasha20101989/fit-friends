import { Container } from 'inversify';

import type { LoggerInterface } from '../core/logger/logger.interface.js';
import type { ConfigInterface } from '../core/config/config.interface.js';
import type { DatabaseClientInterface } from '../core/database-client/mongo-client.interface.js';

import { AppComponent } from '../types/common/app-component.enum.js';
import PinoService from '../core/logger/pino.service.js';
import RestApplication from './rest.js';
import { RestSchema } from '../core/config/rest.schema.js';
import ConfigService from '../core/config/config.service.js';
import MongoClientService from '../core/database-client/database-client.service.js';
import { ExceptionFilter } from '../core/exception-filter/exception-filter.interface.js';
import { AppExceptionFilter } from '../core/exception-filter/app.exception-filter.js';
import { HttpErrorExceptionFilter } from '../core/exception-filter/http-error.exception-filter.js';
import { ValidationExceptionFilter } from '../core/exception-filter/validation.exception-filter.js';

export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<RestApplication>(AppComponent.RestApplication).to(RestApplication).inSingletonScope();
  restApplicationContainer.bind<LoggerInterface>(AppComponent.LoggerInterface).to(PinoService).inSingletonScope();
  restApplicationContainer.bind<ConfigInterface<RestSchema>>(AppComponent.ConfigInterface).to(ConfigService).inSingletonScope();
  restApplicationContainer.bind<DatabaseClientInterface>(AppComponent.DatabaseClientInterface).to(MongoClientService).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(AppComponent.ExceptionFilter).to(AppExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(AppComponent.HttpExceptionFilter).to(HttpErrorExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(AppComponent.ValidationExceptionFilter).to(ValidationExceptionFilter).inSingletonScope();

  return restApplicationContainer;
}
