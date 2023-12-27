import { Gender } from '../types/gender.enum';
import { Location } from '../types/location.enum';
import { Role } from '../types/role.enum';
import { TrainingLevel } from '../types/training-level.enum';
import { WorkoutType } from '../types/workout-type.enum';

export default class CreateTrainerDto {
  public name!: string;
  public email!: string;
  public avatar?: string;
  public password!: string;
  public gender!: Gender;
  public role!: Role;
  public birthDate?: string;
  public description?: string;
  public location!: Location;
  public backgroundImage?: string;
  public trainingLevel!: TrainingLevel;
  public workoutTypes!: WorkoutType[];
  public personalTraining!: boolean;
  public trainerAchievements?: string;
  public certificate!: string;
}
