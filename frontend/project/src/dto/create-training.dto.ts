import { GenderPreference } from '../types/gender-preference.enum';
import { TrainingLevel } from '../types/training-level.enum';
import { WorkoutDuration } from '../types/workout-duration.enum';
import { WorkoutType } from '../types/workout-type.enum';

export default class CreateTrainingDto {
  public name!: string;
  public trainingLevel!: TrainingLevel;
  public workoutType!: WorkoutType;
  public workoutDuration!: WorkoutDuration;
  public price!: number;
  public calories!: number;
  public description!: string;
  public genderPreference!: GenderPreference;
  public video!: string;
}
