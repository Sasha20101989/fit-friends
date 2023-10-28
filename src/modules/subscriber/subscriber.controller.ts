
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import type { LoggerInterface } from '../../core/logger/logger.interface.js';
import type { SubscriberServiceInterface } from './subscriber-service.interface.js';
import type { ConfigInterface } from '../../core/config/config.interface.js';
import { Controller } from '../../core/controller/controller.abstract.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';
import { UnknownRecord } from '../../types/unknown-record.type.js';
import HttpError from '../../core/errors/http-error.js';
import { fillDTO } from '../../core/helpers/index.js';
import CreateSubscriberDto from './dto/create-subscriber.dto.js';
import SubscriberRdo from './rdo/subscriber.rdo.js';
import { SubscriberEntity } from './subscriber.entity.js';

@injectable()
export default class SubscriberController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.SubscriberServiceInterface) private readonly subscriberService: SubscriberServiceInterface,
    @inject(AppComponent.ConfigInterface) configService: ConfigInterface<RestSchema>
  ) {
    super(logger, configService);
    this.logger.info('Register routes for SubscriberController...');

    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create, middlewares: [new ValidateDtoMiddleware(CreateSubscriberDto)] });
  }

  public async create(subscriber: CreateSubscriberDto) {
    const { email } = subscriber;
    const existsSubscriber = await this.subscriberService.findByEmail(email);

    if (existsSubscriber) {
      return existsSubscriber;
    }

    return this.subscriberService.create(subscriber);
  }

}
