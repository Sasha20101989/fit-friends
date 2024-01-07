
import * as core from 'express-serve-static-core';
import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';

import type { LoggerInterface } from '../../core/logger/logger.interface.js';
import type { NotificationServiceInterface } from './notification-service.interface.js';
import type { ConfigInterface } from '../../core/config/config.interface.js';
import { Controller } from '../../core/controller/controller.abstract.js';
import { AppComponent } from '../../types/common/app-component.enum.js';
import { HttpMethod } from '../../types/common/http-method.enum.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import { fillDTO } from '../../core/helpers/index.js';
import NotificationRdo from './rdo/notification.rdo.js';
import { PrivateRouteMiddleware } from '../../core/middlewares/private-route.middleware.js';
import { ValidateObjectIdMiddleware } from '../../core/middlewares/validate-object-id.middleware.js';
import { DocumentExistsMiddleware } from '../../core/middlewares/document-exists.middleware.js';
import { StatusCodes } from 'http-status-codes';
import { ParamsGetNotification } from '../../types/params/params-get-notification.type.js';
import { HttpError } from '../../core/errors/http-error.js';
import { AuthExceptionFilter } from '../../core/exception-filter/auth.exception-filter.js';

@injectable()
export default class NotificationController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.NotificationServiceInterface) private readonly notificationService: NotificationServiceInterface,
    @inject(AppComponent.ConfigInterface) configService: ConfigInterface<RestSchema>,
    @inject(AppComponent.AuthExceptionFilter) private readonly authExceptionFilter: AuthExceptionFilter
  ) {
    super(logger, configService);
    this.logger.info('Register routes for NotificationController...');


    this.addRoute({ path: '/',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new PrivateRouteMiddleware(this.authExceptionFilter)
      ]
    });
    this.addRoute({ path: '/:notificationId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(this.authExceptionFilter),
        new ValidateObjectIdMiddleware('notificationId'),
        new DocumentExistsMiddleware(this.notificationService, 'Notification', 'notificationId')
      ]
    });
  }

  public async index(
    { user }: Request,
    res: Response
  ) {
    const notifications = await this.notificationService.findByUserId(user.id);

    this.ok(res, fillDTO(NotificationRdo, notifications));
  }

  public async delete(
    { params, user }: Request<core.ParamsDictionary | ParamsGetNotification>,
    res: Response
  ): Promise<void> {
    const { notificationId } = params;

    const notification = await this.notificationService.find(notificationId);

    if (!notification) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Notification with id ${notificationId} not found.`,
        'NotificationController'
      );
    }

    if (notification.user.id !== user.id) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        'Access denied: You do not have permission to delete this notification.',
        'NotificationController'
      );
    }

    const notifications = await this.notificationService.destroy(notificationId, user.id);

    this.ok(res, fillDTO(NotificationRdo, notifications));
  }
}
