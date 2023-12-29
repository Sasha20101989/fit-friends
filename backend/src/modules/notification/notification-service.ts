
import {DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import { NotificationServiceInterface } from './notification-service.interface.js';
import { NotificationEntity } from './notification.entity.js';
import { AppComponent } from '../../types/common/app-component.enum.js';
import { MongoId } from '../../types/common/mongo-id.type.js';
import { DEFAULT_NOTIFICATION_COUNT } from './notification.const.js';
import { Notification } from './types/notification.type.js';
import { generateNotification } from '../../core/helpers/common.js';
import { RequestType } from '../request/types/request-type.enum.js';

@injectable()
export default class NotificationService implements NotificationServiceInterface {
  constructor(
    @inject(AppComponent.NotificationModel) private readonly notificationModel: types.ModelType<NotificationEntity>
  ){}

  public async find(documentId: string): Promise<DocumentType<NotificationEntity> | null> {
    return await this.notificationModel
      .findOne({ _id: documentId })
      .populate('user');
  }

  public async destroy(documentId: string, userId: MongoId): Promise<NotificationEntity[]> {
    await this.notificationModel.deleteOne({ _id: documentId });
    return await this.findByUserId(userId);
  }

  public async findByUserId(userId: MongoId): Promise<DocumentType<NotificationEntity>[]> {
    const notificationLimit = DEFAULT_NOTIFICATION_COUNT;
    return await this.notificationModel
      .find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(notificationLimit)
      .populate('user');
  }

  public async create(notification: Notification): Promise<DocumentType<NotificationEntity>> {
    const newNotification = await this.notificationModel.create({owner: notification.owner, user: notification.user, text: notification.text, type: notification.type, request: notification.request });
    return newNotification.populate('user');
  }

  public async exists(documentId: string): Promise<boolean> {
    return this.notificationModel.exists({ _id: documentId }).then((v) => v !== null);
  }

  public async createNotification(requestId: string, ownerUserName: string, ownerId: string, targetUserId: string, requestType: RequestType): Promise<void> {
    const notification: Notification = {
      owner: ownerId,
      user: targetUserId,
      request: requestId,
      type: requestType,
      text: generateNotification(ownerUserName, requestType),
    };

    await this.create(notification);
  }
}
