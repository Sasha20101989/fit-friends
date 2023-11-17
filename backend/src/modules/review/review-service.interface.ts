
import CreateReviewDto from './dto/create-review.dto.js';
import { ReviewEntity } from './review.entity.js';
import { MongoId } from '../../types/common/mongo-id.type.js';
import { DocumentType } from '@typegoose/typegoose';
import { ReviewQueryParams } from './types/review-query-params.js';

export interface ReviewServiceInterface {
  GetReviewsByTrainingId(trainingId: MongoId, query?: ReviewQueryParams): Promise<DocumentType<ReviewEntity>[]>;
  create(dto: CreateReviewDto, trainingId: MongoId, userId: MongoId): Promise<DocumentType<ReviewEntity>>;
}
