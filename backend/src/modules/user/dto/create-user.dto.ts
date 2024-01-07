import { IsNotEmpty, IsEmail, Matches, IsOptional, MaxLength, MinLength, IsEnum, Min, Max, IsInt } from 'class-validator';
import { Gender } from '../../../types/gender.enum.js';
import { Location } from '../../../types/location.enum.js';
import { TrainingLevel } from '../../../types/training-level.enum.js';
import { WorkoutType } from '../../../types/workout-type.enum.js';
import { WorkoutDuration } from '../../../types/workout-duration.enum.js';
import { CALORIES_CONSTRAINTS, DESCRIPTION_CONSTRAINTS, MAX_FILE_SIZE, PASSWORD_CONSTRAINTS, USERNAME_CONSTRAINTS } from '../user.const.js';
import { IsThreeWorkoutTypes } from '../../trainer/validators/is-three-workout-types.js';
import { Role } from '../../../types/role.enum.js';
import { IsFileValidSize } from '../validators/is-file-size-valid.validator.js';

export default class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  @Matches(/^[a-zA-Zа-яА-Я\s]*$/, { message: 'The name must contain only letters of the Russian/English alphabet' })
  @MinLength(USERNAME_CONSTRAINTS.MIN_LENGTH, { message: `Minimum name length must be ${USERNAME_CONSTRAINTS.MIN_LENGTH}` })
  @MaxLength(USERNAME_CONSTRAINTS.MAX_LENGTH, { message: `Maximum name length must be ${USERNAME_CONSTRAINTS.MAX_LENGTH}` })
  public name!: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email address' })
  public email!: string;

  @IsOptional()
  @Matches(/\.(jpg|png)$/, { message: 'Avatar must be in JPG or PNG format' })
  @IsFileValidSize(MAX_FILE_SIZE)
  public avatar?: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(PASSWORD_CONSTRAINTS.MIN_LENGTH, { message: `Minimum password length must be ${PASSWORD_CONSTRAINTS.MIN_LENGTH}` })
  @MaxLength(PASSWORD_CONSTRAINTS.MAX_LENGTH, { message: `Maximum password length must be ${PASSWORD_CONSTRAINTS.MAX_LENGTH}` })
  public password!: string;

  @IsNotEmpty({ message: 'Gender is required' })
  @IsEnum(Gender, { message: 'Invalid gender' })
  public gender!: Gender;

  @IsNotEmpty({ message: 'Role is required' })
  public role!: Role;

  @IsOptional()
  public birthDate?: string;

  @IsOptional()
  @MinLength(DESCRIPTION_CONSTRAINTS.MIN_LENGTH, { message: `Minimum description length must be ${DESCRIPTION_CONSTRAINTS.MIN_LENGTH}` })
  @MaxLength(DESCRIPTION_CONSTRAINTS.MAX_LENGTH, { message: `Maximum description length must be ${DESCRIPTION_CONSTRAINTS.MAX_LENGTH}` })
  public description?: string;

  @IsNotEmpty({ message: 'Location is required' })
  @IsEnum(Location, { message: 'Invalid location' })
  public location!: Location;

  @IsOptional()
  @IsEnum(TrainingLevel, { message: 'Invalid training level' })
  public trainingLevel!: TrainingLevel;

  @IsOptional()
  @IsEnum(WorkoutType, { each: true, message: 'Invalid workout type(s)' })
  @IsThreeWorkoutTypes({ message: 'Workout types array must not have more than 3 elements' })
  public workoutTypes!: WorkoutType[];

  @IsOptional()
  @IsEnum(WorkoutDuration, { message: 'Invalid workout duration' })
  public workoutDuration!: WorkoutDuration;

  @IsOptional()
  @IsInt({ message: 'Calories to burn must be a number' })
  @Min(CALORIES_CONSTRAINTS.MIN_TO_BURN, { message: `Minimum calories to burn must be ${CALORIES_CONSTRAINTS.MIN_TO_BURN}` })
  @Max(CALORIES_CONSTRAINTS.MAX_TO_BURN, { message: `Maximum calories to burn must be ${CALORIES_CONSTRAINTS.MAX_TO_BURN}` })
  public caloriesToBurn!: number;

  @IsOptional()
  @IsInt({ message: 'Calories to spend must be a number' })
  @Min(CALORIES_CONSTRAINTS.MIN_TO_SPEND, { message: `Minimum calories to spend must be ${CALORIES_CONSTRAINTS.MIN_TO_SPEND}` })
  @Max(CALORIES_CONSTRAINTS.MAX_TO_SPEND, { message: `Maximum calories to spend must be ${CALORIES_CONSTRAINTS.MAX_TO_SPEND}` })
  public caloriesToSpend!: number;

  @IsOptional()
  public readinessForWorkout!: boolean;
}
