import { Container } from 'inversify';
import { AppComponent } from './types/common/app-component.enum.js';
import { ConfigInterface } from './core/config/config.interface.js';
import { RestSchema } from './core/config/rest.schema.js';
import ConfigService from './core/config/config.service.js';
import CliApplication from './app/cli.js';
import CLIApplication from './app/cli.js';
import { TokenServiceInterface } from './modules/token/token-service.interface.js';
import TokenService from './modules/token/token-service.js';
import { LoggerInterface } from './core/logger/logger.interface.js';
import PinoService from './core/logger/pino.service.js';
import { ModelType } from '@typegoose/typegoose/lib/types.js';
import { TokenEntity, TokenModel } from './modules/token/token.entity.js';

export function createCLIApplicationContainer() {
  const cliApplicationContainer = new Container();
  cliApplicationContainer.bind<CliApplication>(AppComponent.CLIApplication).to(CLIApplication).inSingletonScope();
  cliApplicationContainer.bind<LoggerInterface>(AppComponent.LoggerInterface).to(PinoService).inSingletonScope();
  cliApplicationContainer.bind<TokenServiceInterface>(AppComponent.TokenServiceInterface).to(TokenService).inSingletonScope();
  cliApplicationContainer.bind<ModelType<TokenEntity>>(AppComponent.TokenModel).toConstantValue(TokenModel);
  cliApplicationContainer.bind<ConfigInterface<RestSchema>>(AppComponent.ConfigInterface).to(ConfigService).inSingletonScope();

  return cliApplicationContainer;
}
