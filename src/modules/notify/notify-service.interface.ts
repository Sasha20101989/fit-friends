
import { DocumentType } from '@typegoose/typegoose';
import CreateNotifyDto from './dto/create-notify.dto.js';
import { NotifyEntity } from './notify.entity.js';

export interface NotifyServiceInterface {
  create(dto: CreateNotifyDto, salt: string): Promise<DocumentType<NotifyEntity>>;
  findById(notifyId: string): Promise<DocumentType<NotifyEntity> | null>;
  exists(documentId: string): Promise<boolean>;
}
