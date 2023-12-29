
import { DocumentType } from '@typegoose/typegoose';
import { NotificationEntity } from './notification.entity.js';
import { MongoId } from '../../types/common/mongo-id.type.js';
import { Notification } from './types/notification.type.js';
import { RequestType } from '../request/types/request-type.enum.js';

export interface NotificationServiceInterface {
  findByUserId(userId: MongoId): Promise<DocumentType<NotificationEntity>[]>;
  find(documentId: string): Promise<DocumentType<NotificationEntity> | null>;
  create(notification: Notification): Promise<DocumentType<NotificationEntity>>;
  destroy(documentId: string, userId: MongoId): Promise<NotificationEntity[]>;
  exists(documentId: MongoId): Promise<boolean>;
  createNotification(requestId: string, ownerUserName: string, ownerId: string, targetUserId: string, requestType: RequestType): Promise<void>;
}
