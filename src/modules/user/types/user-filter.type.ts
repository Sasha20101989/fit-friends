export type UserFilter = {
  location?: string;
  workoutTypes?: { $in: string[] };
  trainingLevel?: string;
}
