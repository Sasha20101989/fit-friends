import { IsNotEmpty, MaxLength, MinLength, IsEnum, IsOptional } from 'class-validator';

import { TrainingLevel } from '../../../types/training-level.enum.js';
import { WorkoutType } from '../../../types/workout-type.enum.js';
import { DESCRIPTION_CONSTRAINTS } from '../../user/user.const.js';
import { IsSinglePDF } from '../validators/is-single-pdf.validator.js';
import { IsThreeWorkoutTypes } from '../validators/is-three-workout-types.js';

export default class UpdateTrainerDto {
  @MinLength(DESCRIPTION_CONSTRAINTS.MIN_LENGTH, { message: `Minimum description length must be ${DESCRIPTION_CONSTRAINTS.MIN_LENGTH}` })
  @MaxLength(DESCRIPTION_CONSTRAINTS.MAX_LENGTH, { message: `Maximum description length must be ${DESCRIPTION_CONSTRAINTS.MAX_LENGTH}` })
  @IsNotEmpty({ message: 'Description is required' })
  public description?: string;

  @IsNotEmpty({ message: 'Training Level is required' })
  @IsEnum(TrainingLevel, { message: 'Invalid training level' })
  public trainingLevel!: TrainingLevel;

  @IsNotEmpty({ message: 'Workout Type is required' })
  @IsEnum(WorkoutType, { each: true, message: 'Invalid workout type(s)' })
  @IsThreeWorkoutTypes({ message: 'Workout types array must not have more than 3 elements' })
  public workoutTypes!: WorkoutType[];

  @IsOptional()
  public personalTraining!: boolean;

  @IsNotEmpty({ message: 'Certificate is required' })
  @IsSinglePDF({ message: 'Trainer certificate must be a single PDF file' })
  public certificate!: string;
}
