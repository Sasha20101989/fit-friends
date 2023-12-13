import { WorkoutType } from '../../../types/workout-type.enum.js';

export type UserFilter = {
  location?: string;
  workoutType?: { $in: WorkoutType[] };
  trainingLevel?: string;
  readinessForWorkout?: boolean;
}
