import express, { Express } from 'express';
import { inject, injectable } from 'inversify';

import type { LoggerInterface } from '../core/logger/logger.interface.js';
import type { ConfigInterface } from '../core/config/config.interface.js';
import { RestSchema } from '../core/config/rest.schema.js';
import { AppComponent } from '../types/app-component.enum.js';
import { getFullServerPath } from '../core/helpers/common.js';

@injectable()
export default class RestApplication {
  private expressApplication: Express;

  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.ConfigInterface) private readonly config: ConfigInterface<RestSchema>,
  ) {
    this.expressApplication = express();
  }

  private async _initExceptionFilters() {

  }

  private async _initMiddleware() {

  }

  private async _initRoutes() {

  }

  private async _initServer() {
    this.logger.info('Try to init server...');

    const host = this.config.get('HOST');
    const port = this.config.get('PORT');
    this.expressApplication.listen(port);

    this.logger.info(`Server started on ${getFullServerPath(host, port)}`);
  }

  public async init() {
    this.logger.info('Application initialization');

    await this._initServer().catch((error) => {
      this.logger.error(`Error server initialization: ${error.message}`);
    });
  }
}
