
import { DocumentType } from '@typegoose/typegoose';
import { NotificationEntity } from './notification.entity.js';
import { MongoId } from '../../types/mongo-id.type.js';
import { Notification } from '../../types/notification.type.js';

export interface NotificationServiceInterface {
  findByUserId(userId: MongoId): Promise<DocumentType<NotificationEntity>[]>;
  find(documentId: string): Promise<DocumentType<NotificationEntity> | null>;
  create(notification: Notification): Promise<DocumentType<NotificationEntity>>;
  destroy(documentId: MongoId): Promise<void>;
  exists(documentId: MongoId): Promise<boolean>;
}
