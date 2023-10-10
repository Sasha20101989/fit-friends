import { Container } from 'inversify';

import type { LoggerInterface } from '../core/logger/logger.interface.js';
import type { ConfigInterface } from '../core/config/config.interface.js';
import { AppComponent } from '../types/app-component.enum.js';
import PinoService from '../core/logger/pino.service.js';
import RestApplication from './rest.js';
import { RestSchema } from '../core/config/rest.schema.js';
import ConfigService from '../core/config/config.service.js';

export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<RestApplication>(AppComponent.RestApplication).to(RestApplication).inSingletonScope();
  restApplicationContainer.bind<LoggerInterface>(AppComponent.LoggerInterface).to(PinoService).inSingletonScope();
  restApplicationContainer.bind<ConfigInterface<RestSchema>>(AppComponent.ConfigInterface).to(ConfigService).inSingletonScope();

  return restApplicationContainer;
}
