import { GenderPreference } from '../types/gender-preference.enum.js';
import { TrainingLevel } from '../types/training-level.enum';
import { WorkoutDuration } from '../types/workout-duration.enum';
import { WorkoutType } from '../types/workout-type.enum';

export default class UpdateTrainingDto {
  public id?: string;
  public name?: string;
  public backgroundImage?: string;
  public trainingLevel?: TrainingLevel;
  public workoutType?: WorkoutType;
  public workoutDuration?: WorkoutDuration;
  public price?: number;
  public calories?: number;
  public description?: string;
  public genderPreference?: GenderPreference;
  public video?: string;
  public specialOffer?: boolean;
  public trainer?: string;
}

