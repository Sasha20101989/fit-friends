import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, Matches, Max, MaxLength, Min, MinLength } from 'class-validator';
import { GenderPreference } from '../../../types/gender-preference.enum.js';
import { TrainingLevel } from '../../../types/training-level.enum.js';
import { WorkoutDuration } from '../../../types/workout-duration.enum.js';
import { WorkoutType } from '../../../types/workout-type.enum.js';
import { CALORIES_CONSTRAINTS, DESCRIPTION_CONSTRAINTS, TRAINING_NAME_CONSTRAINTS } from '../training.const.js';

export default class UpdateTrainingDto{
  @IsOptional()
  @MinLength(TRAINING_NAME_CONSTRAINTS.MIN_LENGTH, { message: `Minimum name length must be ${TRAINING_NAME_CONSTRAINTS.MIN_LENGTH}` })
  @MaxLength(TRAINING_NAME_CONSTRAINTS.MAX_LENGTH, { message: `Maximum name length must be ${TRAINING_NAME_CONSTRAINTS.MAX_LENGTH}` })
  public name?: string;

  @IsOptional()
  @Matches(/\.(jpg|png)$/, { message: 'Background Image must be in JPG or PNG format' })
  public backgroundImage?: string;

  @IsOptional()
  @IsEnum(TrainingLevel, { message: 'Invalid training level' })
  public trainingLevel?: TrainingLevel;

  @IsOptional()
  @IsEnum(WorkoutType, { each: true, message: 'Invalid workout type' })
  public workoutType?: WorkoutType;

  @IsOptional()
  @IsEnum(WorkoutDuration, { message: 'Invalid workout duration' })
  public workoutDuration?: WorkoutDuration;

  @IsOptional()
  @IsNumber({}, { message: 'Price must be a number' })
  @IsInt({ message: 'Price must be an integer' })
  @Min(0, { message: 'Price must be greater than or equal to 0' })
  public price?: number;

  @IsOptional()
  @IsInt({ message: 'Calories to burn must be a number' })
  @Min(CALORIES_CONSTRAINTS.MIN, { message: `Minimum calories to burn must be ${CALORIES_CONSTRAINTS.MIN}` })
  @Max(CALORIES_CONSTRAINTS.MAX, { message: `Maximum calories to burn must be ${CALORIES_CONSTRAINTS.MAX}` })
  @IsNotEmpty({ message: 'Calories is required' })
  public calories?: number;

  @IsOptional()
  @MinLength(DESCRIPTION_CONSTRAINTS.MIN_LENGTH, { message: `Minimum description length must be ${DESCRIPTION_CONSTRAINTS.MIN_LENGTH}` })
  @MaxLength(DESCRIPTION_CONSTRAINTS.MAX_LENGTH, { message: `Maximum description length must be ${DESCRIPTION_CONSTRAINTS.MAX_LENGTH}` })
  public description?: string;

  @IsOptional()
  @IsEnum(GenderPreference, { message: 'Invalid gender preference' })
  public genderPreference?: GenderPreference;

  @IsOptional()
  @Matches(/\.(mov|avi|mp4)$/, { message: 'Video must be in MOV or AVI or MP4 format' })
  public video?: string;

  @IsOptional()
  @IsBoolean({ message: 'SpecialOffer must be a boolean (true or false)' })
  public specialOffer?: boolean;

  @IsOptional()
  public trainer?: string;
}

