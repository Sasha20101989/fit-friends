import { DocumentType } from '@typegoose/typegoose';

import type { MongoId } from '../../types/mongo-id.type.js';
import { BalanceEntity } from './balance.entity.js';
import UpdateBalanceDto from './dto/update-balance.dto.js';
import CreateBalanceDto from './dto/create-balance.dto.js';

export interface BalanceServiceInterface {
  exists(trainingId: MongoId): Promise<boolean>;
  create(dto: CreateBalanceDto, userId: MongoId): Promise<DocumentType<BalanceEntity>>;
  updateBalance(dto: UpdateBalanceDto): Promise<DocumentType<BalanceEntity> | null>;
  findByUserId(userId: MongoId): Promise<DocumentType<BalanceEntity>[]>;
  deleteBalance(trainingId: MongoId): Promise<void>;
}
