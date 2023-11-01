
import {DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import { AppComponent } from '../../types/common/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import CreateReviewDto from './dto/create-review.dto.js';
import { ReviewServiceInterface } from './review-service.interface.js';
import { ReviewEntity } from './review.entity.js';
import { TrainingEntity } from '../training/training.entity.js';
import { MongoId } from '../../types/common/mongo-id.type.js';
import { DEFAULT_REVIEW_COUNT } from './review.const.js';
import { ReviewQueryParams } from './types/review-query-params.js';
import { getSortOptionsForCreatedAt } from '../../core/helpers/index.js';

@injectable()
export default class ReviewService implements ReviewServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.ReviewModel) private readonly reviewModel: types.ModelType<ReviewEntity>,
    @inject(AppComponent.TrainingModel) private readonly trainingModel: types.ModelType<TrainingEntity>,
  ){}

  public async GetReviewsByTrainingId(trainingId: MongoId, query?: ReviewQueryParams): Promise<DocumentType<ReviewEntity>[]> {
    const reviewLimit = Math.min(query?.limit || DEFAULT_REVIEW_COUNT, DEFAULT_REVIEW_COUNT);
    const page = query?.page || 1;
    const skip = (page - 1) * reviewLimit;

    const sort = getSortOptionsForCreatedAt(query?.sortDirection);

    return this.reviewModel
      .find({ training: trainingId })
      .sort(sort)
      .skip(skip)
      .limit(reviewLimit)
      .populate([
        { path: 'user' },
        { path: 'training', populate: { path: 'trainer' } },
      ]);
  }

  public async create(dto: CreateReviewDto, trainingId: MongoId, userId: MongoId): Promise<DocumentType<ReviewEntity>> {
    const review = await this.reviewModel.create({...dto, user: userId, training: trainingId});
    const populatedReview = await review
      .populate([
        { path: 'user' },
        { path: 'training', populate: { path: 'trainer' } },
      ]);
    const reviewsForTraining = await this.GetReviewsByTrainingId(trainingId);
    const totalRating = reviewsForTraining.reduce((total, reviewItem) => total + reviewItem.rating, 0);
    const averageRating = totalRating / reviewsForTraining.length;
    const training = await this.trainingModel.findById(trainingId);

    if (training) {
      training.setRating(averageRating);
      await training.save();

      this.logger.info('Recalculation of training rating is completed');
    }

    return populatedReview;
  }
}

