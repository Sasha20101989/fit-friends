import { Role } from '../types/role.enum';
import { Gender } from '../types/gender.enum';
import { TrainingLevel } from '../types/training-level.enum';
import { WorkoutType } from '../types/workout-type.enum';
import { WorkoutDuration } from '../types/workout-duration.enum';
import { Location } from '../types/location.enum';

export default class UpdateUserDto {
  public name?: string;
  public email?: string;
  public password?: string;
  public role?: Role;
  public gender?: Gender;
  public birthDate?: string;
  public description?: string;
  public location?: Location;
  public backgroundImage?: string;
  public trainingLevel?: TrainingLevel;
  public workoutTypes?: WorkoutType[];
  public workoutDuration?: WorkoutDuration;
  public caloriesToBurn?: number;
  public caloriesToSpend?: number;
  public readinessForWorkout?: boolean;
  public traningCount?: number;
}
