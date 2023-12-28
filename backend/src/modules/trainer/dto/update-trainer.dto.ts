import { IsNotEmpty, MaxLength, MinLength, IsEnum, IsOptional, Matches } from 'class-validator';

import { TrainingLevel } from '../../../types/training-level.enum.js';
import { WorkoutType } from '../../../types/workout-type.enum.js';
import { DESCRIPTION_CONSTRAINTS, USERNAME_CONSTRAINTS } from '../../user/user.const.js';
import { IsSinglePDF } from '../validators/is-single-pdf.validator.js';
import { IsThreeWorkoutTypes } from '../validators/is-three-workout-types.js';
import { Gender } from '../../../types/gender.enum.js';
import { Location } from '../../../types/location.enum.js';

export default class UpdateTrainerDto {
  @MinLength(DESCRIPTION_CONSTRAINTS.MIN_LENGTH, { message: `Minimum description length must be ${DESCRIPTION_CONSTRAINTS.MIN_LENGTH}` })
  @MaxLength(DESCRIPTION_CONSTRAINTS.MAX_LENGTH, { message: `Maximum description length must be ${DESCRIPTION_CONSTRAINTS.MAX_LENGTH}` })
  @IsOptional()
  public description?: string;

  @IsNotEmpty({ message: 'Training Level is required' })
  @IsEnum(TrainingLevel, { message: 'Invalid training level' })
  public trainingLevel!: TrainingLevel;

  @IsNotEmpty({ message: 'Workout Type is required' })
  @IsEnum(WorkoutType, { each: true, message: 'Invalid workout type(s)' })
  @IsThreeWorkoutTypes({ message: 'Workout types array must not have more than 3 elements' })
  public workoutTypes!: WorkoutType[];

  @IsNotEmpty({ message: 'Personal Training is required' })
  public personalTraining!: boolean;

  @IsOptional()
  @IsSinglePDF({ message: 'Trainer certificate must be a single PDF file' })
  public certificate?: string;

  @IsOptional()
  @IsEnum(Gender, { message: 'Invalid gender' })
  public gender?: Gender;

  @Matches(/^[a-zA-Zа-яА-Я\s]*$/, { message: 'The name must contain only letters of the Russian/English alphabet' })
  @MinLength(USERNAME_CONSTRAINTS.MIN_LENGTH, { message: `Minimum name length must be ${USERNAME_CONSTRAINTS.MIN_LENGTH}` })
  @MaxLength(USERNAME_CONSTRAINTS.MAX_LENGTH, { message: `Maximum name length must be ${USERNAME_CONSTRAINTS.MAX_LENGTH}` })
  @IsOptional()
  public name?: string;

  @Matches(/\.(jpg|png)$/, { message: 'Avatar must be in JPG or PNG format' })
  @IsOptional()
  public avatar?: string;

  @IsOptional()
  @IsEnum(Location, { message: 'Invalid location' })
  public location!: Location;
}
