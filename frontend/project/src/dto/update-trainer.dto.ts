import { Gender } from '../types/gender.enum';
import { TrainingLevel } from '../types/training-level.enum';
import { WorkoutType } from '../types/workout-type.enum';

export default class UpdateTrainerDto {
  public description?: string;
  public trainingLevel!: TrainingLevel;
  public workoutTypes!: WorkoutType[];
  public personalTraining?: boolean;
  public certificate?: string;
  public gender?: Gender;
  public name?: string;
  public avatar?: string;
}

