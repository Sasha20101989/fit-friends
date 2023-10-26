
import { IsNotEmpty, MaxLength, MinLength, IsNumber, IsInt, Min, Max } from 'class-validator';

export default class CreateReviewDto {
  @IsNotEmpty({ message: 'Training is required' })
  public training!: string;

  @IsNotEmpty({ message: 'Rating is required' })
  @IsNumber({}, { message: 'Rating must be a number' })
  @IsInt({ message: 'Rating must be an integer' })
  @Min(1, { message: 'Rating must be greater than or equal to 1' })
  @Max(5, { message: 'Rating must be greater than or equal to 5' })
  public rating!: number;

  @IsNotEmpty({ message: 'Text is required' })
  @MinLength(100, { message: 'Minimum text length must be 100' })
  @MaxLength(1024, { message: 'Maximum text length must be 1024' })
  public text!: string;
}
