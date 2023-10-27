import { DocumentType } from '@typegoose/typegoose';
import { MongoId } from '../../types/mongo-id.type.js';
import { UserEntity } from '../user/user.entity.js';

export interface FriendServiceInterface{
  delete(userId: MongoId, friendId: MongoId): Promise<void>;
  findById(userId: MongoId): Promise<DocumentType<UserEntity> | null>;
  getFriends(userId: MongoId): Promise<DocumentType<UserEntity>[]>;
  exists(userId: MongoId, friendId: MongoId): Promise<boolean>;
  create(userId: MongoId, friendId: MongoId): Promise<DocumentType<UserEntity> | null>;
}
