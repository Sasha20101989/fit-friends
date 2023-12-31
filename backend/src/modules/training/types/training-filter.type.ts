import { Sorting } from '../../../types/sorting.enum.js';

export type TrainingFilter = {
  trainer?: string;
  minPrice?: number;
  maxPrice?: number;
  minCalories?: number;
  maxCalories?: number;
  minRating?: number;
  maxRating?: number;
  rating?: { $gte?: number; $lte?: number };
  workoutDuration?: { $in: string[] };
  price?: { $gte?: number; $lte?: number };
  calories?: { $gte?: number; $lte?: number };
  workoutType?: { $in: string[] };
  sortByPrice?: Sorting;
  specialOffer?: boolean;
}
