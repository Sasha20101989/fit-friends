
import { DocumentType } from '@typegoose/typegoose';
import CreateReviewDto from './dto/create-review.dto.js';
import { ReviewEntity } from './review.entity.js';

export interface ReviewServiceInterface {
  create(dto: CreateReviewDto, salt: string): Promise<DocumentType<ReviewEntity>>;
  findById(reviewId: string): Promise<DocumentType<ReviewEntity> | null>;
  exists(documentId: string): Promise<boolean>;
}
