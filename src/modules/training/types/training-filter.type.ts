import { Sorting } from "../../../types/sorting.enum.js";
import { WorkoutType } from "../../../types/workout-type.enum.js";

export type TrainingFilter = {
  trainer?: string;
  minPrice?: number;
  maxPrice?: number;
  minCalories?: number;
  maxCalories?: number;
  rating?: number;
  workoutDuration?: { $in: string[] };
  price?: { $gte?: number; $lte?: number };
  calories?: { $gte?: number; $lte?: number };
  workoutTypes?: { $in: WorkoutType[] };
  sortByPrice?: Sorting;
}
