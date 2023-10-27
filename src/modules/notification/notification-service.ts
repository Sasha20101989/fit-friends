
import {DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import { NotificationServiceInterface } from './notification-service.interface.js';
import { NotificationEntity } from './notification.entity.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import CreateNotificationDto from './dto/create-notification.dto.js';
import { MongoId } from './../../types/mongo-id.type';

@injectable()
export default class NotificationService implements NotificationServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.NotificationModel) private readonly notificationModel: types.ModelType<NotificationEntity>
    ){}

  public async create(dto: CreateNotificationDto): Promise<DocumentType<NotificationEntity>> {
    throw new Error('Method not implemented.');
  }

  public async findById(notificationId: MongoId): Promise<DocumentType<NotificationEntity> | null> {
    throw new Error('Method not implemented.');
  }

  public async exists(documentId: MongoId): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
