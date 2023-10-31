
import {DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import { NotificationServiceInterface } from './notification-service.interface.js';
import { NotificationEntity } from './notification.entity.js';
import { AppComponent } from '../../types/common/app-component.enum.js';
import { MongoId } from '../../types/common/mongo-id.type.js';
import { Notification } from './types/notification.type.js';

@injectable()
export default class NotificationService implements NotificationServiceInterface {
  constructor(
    @inject(AppComponent.NotificationModel) private readonly notificationModel: types.ModelType<NotificationEntity>
    ){}

    public async find(documentId: string): Promise<DocumentType<NotificationEntity> | null> {
      return await this.notificationModel.findOne({ _id: documentId });
    }

    public async destroy(documentId: string): Promise<void> {
      await this.notificationModel.deleteOne({ _id: documentId });
    }

    public async findByUserId(userId: MongoId): Promise<DocumentType<NotificationEntity>[]> {
      return await this.notificationModel.find({ user: userId }).populate('user');
    }

    public async create(notification: Notification): Promise<DocumentType<NotificationEntity>> {
      const newNotification = await this.notificationModel.create({user: notification.user, text: notification.text, type: notification.type });
      return newNotification.populate('user');
    }

    public async exists(documentId: string): Promise<boolean> {
      return this.notificationModel.exists({ _id: documentId }).then((v) => v !== null);
    }
}
