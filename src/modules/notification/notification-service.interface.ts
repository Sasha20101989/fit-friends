
import { DocumentType } from '@typegoose/typegoose';
import CreateNotificationDto from './dto/create-notification.dto.js';
import { NotificationEntity } from './notification.entity.js';

export interface NotificationServiceInterface {
  create(dto: CreateNotificationDto): Promise<DocumentType<NotificationEntity>>;
  findById(notificationId: string): Promise<DocumentType<NotificationEntity> | null>;
  exists(documentId: string): Promise<boolean>;
}
