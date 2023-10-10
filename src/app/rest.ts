import express, { Express } from 'express';
import { inject, injectable } from 'inversify';

import type { LoggerInterface } from '../core/logger/logger.interface.js';
import { AppComponent } from '../types/app-component.enum.js';

@injectable()
export default class RestApplication {
  private expressApplication: Express;

  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
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

  }

  public async init() {
    this.logger.info('Application initialization');
  }
}
