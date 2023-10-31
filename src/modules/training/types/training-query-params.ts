import { Sorting } from '../../../types/sorting.enum.js';
import { WorkoutDuration } from '../../../types/workout-duration.enum.js';
import { WorkoutType } from '../../../types/workout-type.enum.js';

export type TrainingQueryParams = {
  minPrice?: number;
  maxPrice?: number;
  minCalories?: number;
  maxCalories?: number;
  rating?: string;
  workoutDuration?: WorkoutDuration[];
  workoutType?: WorkoutType[];
  sortByPrice?: Sorting;
  limit?: number;
  page?: number;
}
