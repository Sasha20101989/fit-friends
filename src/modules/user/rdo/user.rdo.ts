import { Expose } from 'class-transformer';

import { Gender } from '../../../types/gender.enum..js';
import { Location } from '../../../types/location.enum.js';
import { TrainingLevel } from '../../../types/training-level.enum.js';
import { WorkoutType } from '../../../types/workout-type.enum.js';
import { WorkoutDuration } from '../../../types/workout-duration.enum.js';
import { Role } from '../../../types/role.enum.js';

export default class UserRdo {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public email!: string ;

  @Expose()
  public avatar!: string;

  @Expose()
  public gender!: Gender;

  @Expose()
  public birthDate!: string;

  @Expose()
  public role!: Role;

  @Expose()
  public location!: Location;

  @Expose()
  public backgroundImage!: string;

  @Expose()
  public description!: string;

  @Expose()
  public trainingLevel!: TrainingLevel;

  @Expose()
  public workoutTypes!: WorkoutType[];

  @Expose()
  public workoutDuration!: WorkoutDuration;

  @Expose()
  public caloriesToBurn!: number;

  @Expose()
  public caloriesToSpend!: number;

  @Expose()
  public readinessForWorkout!: boolean;

  @Expose()
  public traningCount!: number;

  @Expose()
  public friends!: string[];
}
