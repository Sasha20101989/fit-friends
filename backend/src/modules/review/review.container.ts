
import { ModelType } from '@typegoose/typegoose/lib/types.js';
import { Container } from 'inversify';

import type { ControllerInterface } from '../../core/controller/controller.interface.js';
import type { ReviewServiceInterface } from './review-service.interface.js';
import { AppComponent } from '../../types/common/app-component.enum.js';
import ReviewService from './review-service.js';
import { ReviewEntity, ReviewModel } from './review.entity.js';
import ReviewController from './review.controller.js';

export function createReviewContainer() {
  const reviewContainer = new Container();
  reviewContainer.bind<ReviewServiceInterface>(AppComponent.ReviewServiceInterface).to(ReviewService).inSingletonScope();
  reviewContainer.bind<ModelType<ReviewEntity>>(AppComponent.ReviewModel).toConstantValue(ReviewModel);
  reviewContainer.bind<ControllerInterface>(AppComponent.ReviewController).to(ReviewController).inSingletonScope();

  return reviewContainer;
}
