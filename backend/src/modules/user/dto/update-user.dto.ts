import { IsEnum, IsInt, IsOptional, Matches, Max, MaxLength, Min, MinLength } from 'class-validator';
import { CALORIES_CONSTRAINTS, DESCRIPTION_CONSTRAINTS, USERNAME_CONSTRAINTS } from '../user.const.js';
import { Gender } from '../../../types/gender.enum.js';
import { Location } from '../../../types/location.enum.js';
import { TrainingLevel } from '../../../types/training-level.enum.js';
import { WorkoutType } from '../../../types/workout-type.enum.js';
import { WorkoutDuration } from '../../../types/workout-duration.enum.js';
import { Role } from '../../../types/role.enum.js';

export default class UpdateUserDto {
  @IsOptional()
  @Matches(/^[a-zA-Zа-яА-Я\s]*$/, { message: 'The name must contain only letters of the Russian/English alphabet' })
  @MinLength(USERNAME_CONSTRAINTS.MIN_LENGTH, { message: `Minimum name length must be ${USERNAME_CONSTRAINTS.MIN_LENGTH}` })
  @MaxLength(USERNAME_CONSTRAINTS.MAX_LENGTH, { message: `Maximum name length must be ${USERNAME_CONSTRAINTS.MIN_LENGTH}` })
  public name?: string;

  @IsOptional()
  public email?: string;

  @IsOptional()
  @Matches(/\.(jpg|png)$/, { message: 'Avatar must be in JPG or PNG format' })
  public avatar?: string;

  @IsOptional()
  public password?: string;

  @IsOptional()
  public role?: Role;

  @IsOptional()
  @IsEnum(Gender, { message: 'Invalid gender' })
  public gender?: Gender;

  @IsOptional()
  public birthDate?: string;

  @IsOptional()
  @MinLength(DESCRIPTION_CONSTRAINTS.MIN_LENGTH, { message: `Minimum description length must be ${DESCRIPTION_CONSTRAINTS.MIN_LENGTH}` })
  @MaxLength(DESCRIPTION_CONSTRAINTS.MAX_LENGTH, { message: `Maximum description length must be ${DESCRIPTION_CONSTRAINTS.MAX_LENGTH}` })
  public description?: string;

  @IsOptional()
  @IsEnum(Location, { message: 'Invalid location' })
  public location?: Location;

  @IsOptional()
  @Matches(/\.(jpg|png)$/, { message: 'Background image must be in JPG or PNG format' })
  public backgroundImage?: string;

  @IsOptional()
  @IsEnum(TrainingLevel, { message: 'Invalid training level' })
  public trainingLevel?: TrainingLevel;

  @IsOptional()
  @IsEnum(WorkoutType, { each: true, message: 'Invalid workout type(s)' })
  public workoutTypes?: WorkoutType[];

  @IsOptional()
  @IsEnum(WorkoutDuration, { message: 'Invalid workout duration' })
  public workoutDuration?: WorkoutDuration;

  @IsOptional()
  @IsInt({ message: 'Calories to burn must be a number' })
  @Min(CALORIES_CONSTRAINTS.MIN_TO_BURN, { message: `Minimum calories to burn must be ${CALORIES_CONSTRAINTS.MIN_TO_BURN}` })
  @Max(CALORIES_CONSTRAINTS.MAX_TO_BURN, { message: `Maximum calories to burn must be ${CALORIES_CONSTRAINTS.MAX_TO_BURN}` })
  public caloriesToBurn?: number;

  @IsOptional()
  @IsInt({ message: 'Calories to spend must be a number' })
  @Min(CALORIES_CONSTRAINTS.MIN_TO_SPEND, { message: `Minimum calories to spend must be ${CALORIES_CONSTRAINTS.MIN_TO_SPEND}` })
  @Max(CALORIES_CONSTRAINTS.MAX_TO_SPEND, { message: `Maximum calories to spend must be ${CALORIES_CONSTRAINTS.MAX_TO_SPEND}` })
  public caloriesToSpend?: number;

  @IsOptional()
  public readinessForWorkout?: boolean;

  @IsOptional()
  @IsInt({ message: 'Comment count must be an integer' })
  @Min(0, { message: 'Comment count cannot be negative' })
  public traningCount?: number;
}
