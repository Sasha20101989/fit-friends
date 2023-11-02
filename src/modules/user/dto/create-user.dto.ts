import { IsNotEmpty, IsEmail, Matches, IsOptional, MaxLength, MinLength, IsEnum, Min, Max, IsInt } from 'class-validator';
import { Gender } from '../../../types/gender.enum.js';
import { Location } from '../../../types/location.enum.js';
import { TrainingLevel } from '../../../types/training-level.enum.js';
import { WorkoutType } from '../../../types/workout-type.enum.js';
import { WorkoutDuration } from '../../../types/workout-duration.enum.js';
import { CALORIES_CONSTRAINTS, DESCRIPTION_CONSTRAINTS, PASSWORD_CONSTRAINTS, USERNAME_CONSTRAINTS } from '../user.const.js';
import { IsThreeWorkoutTypes } from '../../trainer/validators/is-three-workout-types.js';
import { Role } from '../../../types/role.enum.js';

export default class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  @Matches(/^[a-zA-Zа-яА-Я\s]*$/, { message: 'The name must contain only letters of the Russian/English alphabet' })
  @MinLength(USERNAME_CONSTRAINTS.MIN_LENGTH, { message: `Minimum name length must be ${USERNAME_CONSTRAINTS.MIN_LENGTH}` })
  @MaxLength(USERNAME_CONSTRAINTS.MAX_LENGTH, { message: `Maximum name length must be ${USERNAME_CONSTRAINTS.MAX_LENGTH}` })
  public name!: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email address' })
  public email!: string;

  @Matches(/\.(jpg|png)$/, { message: 'Avatar must be in JPG or PNG format' })
  @IsOptional()
  public avatar?: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(PASSWORD_CONSTRAINTS.MIN_LENGTH, { message: `Minimum password length must be ${PASSWORD_CONSTRAINTS.MIN_LENGTH}` })
  @MaxLength(PASSWORD_CONSTRAINTS.MAX_LENGTH, { message: `Maximum password length must be ${PASSWORD_CONSTRAINTS.MAX_LENGTH}` })
  public password!: string;

  @IsEnum(Gender, { message: 'Invalid gender' })
  public gender!: Gender;

  public role!: Role;

  @IsOptional()
  public birthDate?: string;

  @MinLength(DESCRIPTION_CONSTRAINTS.MIN_LENGTH, { message: `Minimum description length must be ${DESCRIPTION_CONSTRAINTS.MIN_LENGTH}` })
  @MaxLength(DESCRIPTION_CONSTRAINTS.MAX_LENGTH, { message: `Maximum description length must be ${DESCRIPTION_CONSTRAINTS.MAX_LENGTH}` })
  @IsOptional()
  public description?: string;

  @IsNotEmpty({ message: 'Location is required' })
  @IsEnum(Location, { message: 'Invalid location' })
  public location!: Location;

  @Matches(/\.(jpg|png)$/, { message: 'Background image must be in JPG or PNG format' })
  @IsNotEmpty({ message: 'Background image is required' })
  public backgroundImage!: string;

  @IsNotEmpty({ message: 'Training level is required' })
  @IsEnum(TrainingLevel, { message: 'Invalid training level' })
  public trainingLevel!: TrainingLevel;

  @IsNotEmpty({ message: 'Workout types are required' })
  @IsEnum(WorkoutType, { each: true, message: 'Invalid workout type(s)' })
  @IsThreeWorkoutTypes({ message: 'Workout types array must not have more than 3 elements' })
  public workoutTypes!: WorkoutType[];

  @IsNotEmpty({ message: 'Workout duration is required' })
  @IsEnum(WorkoutDuration, { message: 'Invalid workout duration' })
  public workoutDuration!: WorkoutDuration;

  @IsNotEmpty({ message: 'Calories to burn are required' })
  @IsInt({ message: 'Calories to burn must be a number' })
  @Min(CALORIES_CONSTRAINTS.MIN_TO_BURN, { message: `Minimum calories to burn must be ${CALORIES_CONSTRAINTS.MIN_TO_BURN}` })
  @Max(CALORIES_CONSTRAINTS.MAX_TO_BURN, { message: `Maximum calories to burn must be ${CALORIES_CONSTRAINTS.MAX_TO_BURN}` })
  public caloriesToBurn!: number;

  @IsNotEmpty({ message: 'Calories to spend are required' })
  @IsInt({ message: 'Calories to spend must be a number' })
  @Min(CALORIES_CONSTRAINTS.MIN_TO_SPEND, { message: `Minimum calories to spend must be ${CALORIES_CONSTRAINTS.MIN_TO_SPEND}` })
  @Max(CALORIES_CONSTRAINTS.MAX_TO_SPEND, { message: `Maximum calories to spend must be ${CALORIES_CONSTRAINTS.MAX_TO_SPEND}` })
  public caloriesToSpend!: number;

  @IsNotEmpty({ message: 'Readiness for workout is required' })
  public readinessForWorkout!: boolean;
}
