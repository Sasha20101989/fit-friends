import { DocumentType } from '@typegoose/typegoose';

import type { MongoId } from '../../types/common/mongo-id.type.js';
import { BalanceEntity } from './balance.entity.js';
import UpdateBalanceDto from './dto/update-balance.dto.js';
import CreateBalanceDto from './dto/create-balance.dto.js';

export interface BalanceServiceInterface {
  exists(trainingId: MongoId): Promise<boolean>;
  create(dto: CreateBalanceDto, userId: MongoId, trainingId: MongoId): Promise<DocumentType<BalanceEntity>>;
  updateBalance(dto: UpdateBalanceDto, trainingId: MongoId): Promise<DocumentType<BalanceEntity> | null>;
  findByUserId(userId: MongoId, limit?: number): Promise<DocumentType<BalanceEntity>[]>;
  deleteBalance(trainingId: MongoId): Promise<void>;
}
