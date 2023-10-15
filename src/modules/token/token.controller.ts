import { inject, injectable } from 'inversify';

import type { LoggerInterface } from '../../core/logger/logger.interface.js';
import type { ConfigInterface } from '../../core/config/config.interface.js';

import { Controller } from '../../core/controller/controller.abstract.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import { HttpMethod } from '../../types/http-method.enum.js';
//import { TokenServiceInterface } from './token-service.interface.js';

@injectable()
export default class TokenController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    //@inject(AppComponent.TokenServiceInterface) private readonly tokenService: TokenServiceInterface,
    @inject(AppComponent.ConfigInterface) configService: ConfigInterface<RestSchema>,
  ) {
    super(logger, configService);
    this.logger.info('Register routes for TokenController...');

    this.addRoute({ path: '/refresh', method: HttpMethod.Post, handler: this.refreshToken });
  }

  public async refreshToken() {

  }
}
