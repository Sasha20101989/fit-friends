
import { DocumentType } from '@typegoose/typegoose';
import CreateRequestDto from './dto/create-request.dto.js';
import { RequestEntity } from './request.entity.js';
import { MongoId } from '../../types/common/mongo-id.type.js';
import { RequestType } from './types/request-type.enum.js';
import UpdateRequestDto from './dto/update-request.dto.js';
import { RequestStatus } from './types/request-status.enum.js';

export interface RequestServiceInterface {
  findByUserId(userId: MongoId): Promise<DocumentType<RequestEntity>[]>;
  updateStatus(dto: UpdateRequestDto, requestId: MongoId): Promise<DocumentType<RequestEntity> | null>;
  create(dto: CreateRequestDto, initiatorId: MongoId, userId: MongoId, requestStatus: RequestStatus): Promise<DocumentType<RequestEntity>>;
  existsRequestByType(initiatorId: MongoId, userId: MongoId, requestType: RequestType): Promise<boolean>;
  exists(documentId: string): Promise<boolean>;
}
