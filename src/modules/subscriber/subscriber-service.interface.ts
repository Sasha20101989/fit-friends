
import CreateSubscriberDto from './dto/create-subscriber.dto.js';
import { SubscriberEntity } from './subscriber.entity.js';
import { DocumentType } from '@typegoose/typegoose';

export interface SubscriberServiceInterface {
  create(dto: CreateSubscriberDto): Promise<DocumentType<SubscriberEntity>>;
  destroy(id: string): Promise<void>;
  findById(id: string): Promise<DocumentType<SubscriberEntity> | null>;
  update(id: string, item: SubscriberEntity): Promise<DocumentType<SubscriberEntity> | null>;
  findByEmail(email: string): Promise<DocumentType<SubscriberEntity> | null>;
}
