import { WorkoutDuration } from './workout-duration.enum.js';
import { WorkoutType } from './workout-type.enum.js';

export type TrainingQueryParams = {
  minPrice?: number;
  maxPrice?: number;
  minCalories?: number;
  maxCalories?: number;
  rating?: number;
  workoutDuration?: WorkoutDuration[];
  workoutType?: WorkoutType[];
}
