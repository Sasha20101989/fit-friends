import { IsOptional } from 'class-validator';
import { GenderPreference } from '../../../types/gender-preference.enum.js';
import { TrainingLevel } from '../../../types/training-level.enum.js';
import { WorkoutDuration } from '../../../types/workout-duration.enum.js';
import { WorkoutType } from '../../../types/workout-type.enum.js';

export default class CreateTrainingDto{
  @IsOptional()
  public name!: string;

  @IsOptional()
  public backgroundImage!: string;

  @IsOptional()
  public trainingLevel!: TrainingLevel;

  @IsOptional()
  public workoutType!: WorkoutType;

  @IsOptional()
  public workoutDuration!: WorkoutDuration;

  @IsOptional()
  public price!: number;

  @IsOptional()
  public calories!: number;

  @IsOptional()
  public description!: string;

  @IsOptional()
  public genderPreference!: GenderPreference;

  @IsOptional()
  public video!: string;

  @IsOptional()
  public trainer!: string;

  @IsOptional()
  public specialOffer!: boolean;
}

