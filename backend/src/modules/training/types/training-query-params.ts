import { Sorting } from '../../../types/sorting.enum.js';
import { WorkoutDuration } from '../../../types/workout-duration.enum.js';
import { WorkoutType } from '../../../types/workout-type.enum.js';

export type TrainingQueryParams = {
  minPrice?: number;
  maxPrice?: number;
  minCalories?: number;
  maxCalories?: number;
  minRating?: number;
  maxRating?: number;
  rating?: string;
  workoutDuration?: WorkoutDuration[];
  workoutTypes?: WorkoutType[];
  sortByPrice?: Sorting;
  limit?: number;
  page?: number;
  createdAtDirection?: Sorting;
  isSpecial?: boolean;
  trainer?: string;
}
