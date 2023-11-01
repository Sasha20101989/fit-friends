import { WorkoutType } from "../../../types/workout-type.enum.js";

export type UserFilter = {
  location?: string;
  workoutTypes?: { $in: WorkoutType[] };
  trainingLevel?: string;
}
