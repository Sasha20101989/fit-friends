import { Gender } from '../types/gender.enum';
import { Role } from '../types/role.enum';
import { TrainingLevel } from '../types/training-level.enum';
import { WorkoutDuration } from '../types/workout-duration.enum';
import { WorkoutType } from '../types/workout-type.enum';

export default class CreateUserDto {
  public id?: string;
  public name!: string;
  public email!: string;
  public avatar?: string;
  public password!: string;
  public gender!: Gender;
  public role!: Role;
  public birthDate?: string;
  public location!: Location;
  public description?: string;
  public backgroundImage?: string;
  public trainingLevel?: TrainingLevel;
  public workoutTypes?: WorkoutType[];
  public workoutDuration?: WorkoutDuration;
  public caloriesToBurn?: number;
  public caloriesToSpend?: number;
  public readinessForWorkout?: boolean;
}
