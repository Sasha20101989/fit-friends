import { DocumentType } from '@typegoose/typegoose';
import { OrderEntity } from './order.entity.js';
import CreateOrderDto from './dto/create-order.dto.js';
import { OrderQueryParams } from './types/order-query-params.js';
import TrainingOrderRdo from './rdo/training-order.rdo.js';
import { MongoId } from '../../types/common/mongo-id.type.js';
import { TrainingEntity } from '../training/training.entity.js';

export interface OrderServiceInterface{
  create(dto: CreateOrderDto, training: DocumentType<TrainingEntity>, userId: MongoId): Promise<DocumentType<OrderEntity> | null>;
  exists(documentId: MongoId): Promise<boolean>;
  findByTrainerId(trainerId: MongoId, query: OrderQueryParams): Promise<TrainingOrderRdo[]>;
}
