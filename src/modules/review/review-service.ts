
import {DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { MongoId } from './../../types/mongo-id.type';
import CreateReviewDto from './dto/create-review.dto.js';
import { ReviewServiceInterface } from './review-service.interface.js';
import { ReviewEntity } from './review.entity.js';

@injectable()
export default class ReviewService implements ReviewServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.ReviewModel) private readonly reviewModel: types.ModelType<ReviewEntity>
    ){}

  public async create(dto: CreateReviewDto, salt: string): Promise<DocumentType<ReviewEntity>> {
    throw new Error('Method not implemented.');
  }

  public async findById(reviewId: MongoId): Promise<DocumentType<ReviewEntity> | null> {
    throw new Error('Method not implemented.');
  }

  public async exists(documentId: MongoId): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

