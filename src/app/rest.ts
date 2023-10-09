import express, { Express } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export default class RestApplication {
  private expressApplication: Express;

  constructor(

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

  }
}
