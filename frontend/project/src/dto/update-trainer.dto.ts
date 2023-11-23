import { TrainingLevel } from '../types/training-level.enum';
import { WorkoutType } from '../types/workout-type.enum';

export default class UpdateTrainerDto {
  public description!: string;
  public trainingLevel!: TrainingLevel;
  public workoutTypes!: WorkoutType[];
  public readinessForWorkout?: boolean;
  public certificate!: string;
}
