import { WorkoutType } from './workout-type.enum.js';

export interface FilterTypes {
  workoutTypes?: { $in: WorkoutType[] };
}
