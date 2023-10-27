
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import type { LoggerInterface } from '../../core/logger/logger.interface.js';
import type { NotificationServiceInterface } from './notification-service.interface.js';
import type { ConfigInterface } from '../../core/config/config.interface.js';
import { Controller } from '../../core/controller/controller.abstract.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';
import { UnknownRecord } from '../../types/unknown-record.type.js';
import HttpError from '../../core/errors/http-error.js';
import { fillDTO } from '../../core/helpers/index.js';
import CreateNotificationDto from './dto/create-notification.dto.js';
import NotificationRdo from './rdo/notification.rdo.js';

@injectable()
export default class NotificationController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.NotificationServiceInterface) private readonly notificationService: NotificationServiceInterface,
    @inject(AppComponent.ConfigInterface) configService: ConfigInterface<RestSchema>
  ) {
    super(logger, configService);
    this.logger.info('Register routes for NotificationController...');

    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create, middlewares: [new ValidateDtoMiddleware(CreateNotificationDto)] });
  }

}
