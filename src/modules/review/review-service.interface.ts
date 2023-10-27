
import CreateReviewDto from './dto/create-review.dto.js';
import { ReviewEntity } from './review.entity.js';
import { MongoId } from '../../types/mongo-id.type.js';
import { DocumentType } from '@typegoose/typegoose';

export interface ReviewServiceInterface {
  GetReviewsByTrainingId(trainingId: MongoId): Promise<DocumentType<ReviewEntity>[]>;
  create(dto: CreateReviewDto, trainingId: MongoId, userId: MongoId): Promise<DocumentType<ReviewEntity>>;
}
