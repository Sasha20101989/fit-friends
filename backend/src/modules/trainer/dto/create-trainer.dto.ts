import { IsNotEmpty, IsEmail, Matches, IsOptional, MaxLength, MinLength, IsEnum } from 'class-validator';
import { Gender } from '../../../types/gender.enum.js';
import { Location } from '../../../types/location.enum.js';
import { TrainingLevel } from '../../../types/training-level.enum.js';
import { WorkoutType } from '../../../types/workout-type.enum.js';
import { ARCHIEVEMENTS_CONSTRAINTS, DESCRIPTION_CONSTRAINTS, PASSWORD_CONSTRAINTS, USERNAME_CONSTRAINTS } from '../../user/user.const.js';
import { IsSinglePDF } from '../validators/is-single-pdf.validator.js';
import { IsThreeWorkoutTypes } from '../validators/is-three-workout-types.js';
import { Role } from '../../../types/role.enum.js';

export default class CreateTrainerDto {
  @IsNotEmpty({ message: 'Name is required' })
  @Matches(/^[a-zA-Zа-яА-Я\s]*$/, { message: 'The name must contain only letters of the Russian/English alphabet' })
  @MinLength(USERNAME_CONSTRAINTS.MIN_LENGTH, { message: `Minimum name length must be ${USERNAME_CONSTRAINTS.MIN_LENGTH}` })
  @MaxLength(USERNAME_CONSTRAINTS.MAX_LENGTH, { message: `Maximum name length must be ${USERNAME_CONSTRAINTS.MIN_LENGTH}` })
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
  public personalTraining!: boolean;

  @IsOptional()
  @MinLength(ARCHIEVEMENTS_CONSTRAINTS.MIN_LENGTH, { message: `Minimum achievements length must be ${ARCHIEVEMENTS_CONSTRAINTS.MIN_LENGTH}` })
  @MaxLength(ARCHIEVEMENTS_CONSTRAINTS.MAX_LENGTH, { message: `Maximum achievements length must be ${ARCHIEVEMENTS_CONSTRAINTS.MAX_LENGTH}` })
  public trainerAchievements?: string;

  @IsOptional()
  @IsSinglePDF({ message: 'Trainer certificate must be a single PDF file' })
  public certificates!: string[];
}
