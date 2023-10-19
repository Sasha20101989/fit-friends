import { DocumentType } from '@typegoose/typegoose';

import { TrainingEntity } from './training.entity.js';
import CreateTrainingDto from './dto/create-training.dto.js';
import { MongoId } from '../../types/mongo-id.type.js';

export interface TrainingServiceInterface{
  create(dto: CreateTrainingDto): Promise<DocumentType<TrainingEntity>>;
  getTrainingDetails(offerId: MongoId): Promise<DocumentType<TrainingEntity> | null>;
  exists(documentId: string): Promise<boolean>;
}
