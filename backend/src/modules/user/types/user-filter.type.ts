export type UserFilter = {
  location?: { $in: string[] };
  workoutTypes?: { $in: string[] };
  trainingLevel?: string;
  readinessForWorkout?: boolean;
}
