import { DocumentType } from '@typegoose/typegoose';
import { OrderEntity } from './order.entity.js';
import CreateOrderDto from './dto/create-order.dto.js';
import { OrderQueryParams } from '../../types/order-query-params.js';
import TrainingOrderRdo from './rdo/training-order.rdo.js';

export interface OrderServiceInterface{
  create(dto: CreateOrderDto): Promise<DocumentType<OrderEntity> | null>;
  exists(documentId: string): Promise<boolean>;
  findByTrainerId(trainerId: string, query: OrderQueryParams): Promise<TrainingOrderRdo[]>;
}
