import { Gender } from '../types/gender.enum';
import { Location } from '../types/location.enum';
import { TrainingLevel } from '../types/training-level.enum';
import { WorkoutType } from '../types/workout-type.enum';

export default class UpdateTrainerDto {
  public description?: string;
  public trainingLevel!: TrainingLevel | string;
  public workoutTypes!: WorkoutType[];
  public personalTraining?: boolean;
  public certificate?: string;
  public gender?: Gender;
  public name?: string;
  public location?: Location;
}

