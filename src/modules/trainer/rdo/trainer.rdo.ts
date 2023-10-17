import { Expose } from 'class-transformer';

import { Gender } from '../../../types/gender.enum..js';
import { Location } from '../../../types/location.enum.js';
import { TrainingLevel } from '../../../types/training-level.enum.js';
import { WorkoutType } from '../../../types/workout-type.enum.js';
import { Role } from '../../../types/role.enum.js';

export default class TrainerRdo {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public email!: string;

  @Expose()
  public avatar!: string;

  @Expose()
  public gender!: Gender;

  @Expose()
  public birthDate!: string;

  @Expose()
  public role!: Role;

  @Expose()
  public description!: string;

  @Expose()
  public location!: Location;

  @Expose()
  public backgroundImage!: string;

  @Expose()
  public trainingLevel!: TrainingLevel;

  @Expose()
  public workoutTypes!: WorkoutType[];

  @Expose()
  public certificate!: string;

  @Expose()
  public trainerAchievements!: string;

  @Expose()
  public personalTraining!: boolean;
}
