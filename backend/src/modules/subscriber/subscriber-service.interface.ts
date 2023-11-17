
import { MongoId } from '../../types/common/mongo-id.type.js';
import { SubscriberEntity } from './subscriber.entity.js';
import { DocumentType } from '@typegoose/typegoose';

export interface SubscriberServiceInterface {
  create(userId: MongoId, trainerId: MongoId): Promise<DocumentType<SubscriberEntity>>;
  exists(userId: MongoId, trainerId: MongoId): Promise<boolean>;
  destroy(userId: MongoId, trainerId: MongoId): Promise<void>;
  findByTrainerId(trainerId: MongoId): Promise<DocumentType<SubscriberEntity>[]>;
}
