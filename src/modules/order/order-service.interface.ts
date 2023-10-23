import { DocumentType } from '@typegoose/typegoose';
import { OrderEntity } from './order.entity.js';
import CreateOrderDto from './dto/create-order.dto.js';

export interface OrderServiceInterface{
  create(dto: CreateOrderDto): Promise<DocumentType<OrderEntity>>;
  exists(documentId: string): Promise<boolean>;
  findByTrainerId(trainerId: string): Promise<object[]>;
}
