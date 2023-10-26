import { IsNotEmpty, Min, Max, IsInt, IsNumber, MaxLength, MinLength } from 'class-validator';

export default class CreateReviewDto {
  @IsNotEmpty({ message: 'Name is required' })
  public user!: string;

  @IsNotEmpty({ message: 'Training id is required' })
  public training!: string;

  @IsNotEmpty({ message: 'Rating id is required' })
  @IsNumber({}, { message: 'Rating must be a number' })
  @IsInt({ message: 'Rating must be an integer' })
  @Min(1, { message: 'Rating must be greater than or equal to 1' })
  @Max(5, { message: 'Rating must be greater than or equal to 5' })
  public rating!: number;

  @IsNotEmpty({ message: 'Rating id is required' })
  @MinLength(100, { message: `Minimum description length must be ${100}` })
  @MaxLength(1024, { message: `Maximum description length must be ${1024}` })
  public text!: string;
}
