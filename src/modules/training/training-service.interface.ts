import { DocumentType } from '@typegoose/typegoose';

import { TrainingEntity } from './training.entity.js';
import CreateTrainingDto from './dto/create-training.dto.js';
import { MongoId } from '../../types/common/mongo-id.type.js';
import UpdateTrainingDto from './dto/update-training.dto.js';
import { TrainingQueryParams } from './types/training-query-params.js';

export interface TrainingServiceInterface{
  create(dto: CreateTrainingDto): Promise<DocumentType<TrainingEntity>>;
  getTrainingDetails(trainingId: MongoId): Promise<DocumentType<TrainingEntity> | null>;
  exists(trainingId: MongoId): Promise<boolean>;
  update(trainingId: MongoId, dto: UpdateTrainingDto): Promise<DocumentType<TrainingEntity> | null>;
  find(query: TrainingQueryParams, trainerId: MongoId): Promise<DocumentType<TrainingEntity>[]>;
  findByTrainerId(trainerId: MongoId): Promise<DocumentType<TrainingEntity>[]>;
  sendTrainingNotifications(trainerId: MongoId, training: DocumentType<TrainingEntity>): Promise<void>;
  findById(documentId: MongoId): Promise<DocumentType<TrainingEntity> | null>;
}
