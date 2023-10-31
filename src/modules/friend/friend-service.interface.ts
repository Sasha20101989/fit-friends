import { DocumentType } from '@typegoose/typegoose';
import { MongoId } from '../../types/common/mongo-id.type.js';
import { UserEntity } from '../user/user.entity.js';
import { FriendQueryParams } from './types/friend-query-params.js';

export interface FriendServiceInterface{
  delete(userId: MongoId, friendId: MongoId): Promise<void>;
  findById(userId: MongoId): Promise<DocumentType<UserEntity> | null>;
  find(userId: MongoId, query: FriendQueryParams): Promise<DocumentType<UserEntity>[]>;
  exists(userId: MongoId, friendId: MongoId): Promise<boolean>;
  create(userId: MongoId, friendId: MongoId): Promise<DocumentType<UserEntity> | null>;
}
