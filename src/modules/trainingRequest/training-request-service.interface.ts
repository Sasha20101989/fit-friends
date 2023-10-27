
import { DocumentType } from '@typegoose/typegoose';
import CreateTrainingRequestDto from './dto/create-training-request.dto.js';
import { TrainingRequestEntity } from './training-request.entity.js';
import { MongoId } from '../../types/mongo-id.type.js';
import { RequestType } from '../../types/request-type.enum.js';
import UpdateTrainingRequestDto from './dto/update-training-request.dto.js';
import { RequestStatus } from '../../types/request-status.enum.js';

export interface TrainingRequestServiceInterface {
  updateStatus(dto: UpdateTrainingRequestDto, requestId: MongoId): Promise<DocumentType<TrainingRequestEntity> | null>;
  create(dto: CreateTrainingRequestDto, initiatorId: MongoId, userId: MongoId, requestStatus: RequestStatus): Promise<DocumentType<TrainingRequestEntity>>;
  existsRequestByType(initiatorId: MongoId, userId: MongoId, requestType: RequestType): Promise<boolean>;
  exists(documentId: string): Promise<boolean>;
}
