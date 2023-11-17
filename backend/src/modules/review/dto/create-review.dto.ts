
import { IsNotEmpty, MaxLength, MinLength, IsNumber, IsInt, Min, Max } from 'class-validator';
import { RATING_CONSTRAINTS, REVIEW_TEXT_CONSTRAINTS } from '../review.const.js';

export default class CreateReviewDto {
  @IsNotEmpty({ message: 'Rating is required' })
  @IsNumber({}, { message: 'Rating must be a number' })
  @IsInt({ message: 'Rating must be an integer' })
  @Min(RATING_CONSTRAINTS.MIN, { message: `Rating must be greater than or equal to ${RATING_CONSTRAINTS.MIN}` })
  @Max(RATING_CONSTRAINTS.MAX, { message: `Rating must be greater than or equal to ${RATING_CONSTRAINTS.MAX}` })
  public rating!: number;

  @IsNotEmpty({ message: 'Text is required' })
  @MinLength(REVIEW_TEXT_CONSTRAINTS.MIN, { message: `Minimum text length must be ${REVIEW_TEXT_CONSTRAINTS.MIN}` })
  @MaxLength(REVIEW_TEXT_CONSTRAINTS.MAX, { message: `Maximum text length must be ${REVIEW_TEXT_CONSTRAINTS.MAX}` })
  public text!: string;
}
