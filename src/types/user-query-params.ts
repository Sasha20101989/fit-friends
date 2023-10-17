import { Location } from './location.enum.js';
import { Role } from './role.enum.js';
import { TrainingLevel } from './training-level.enum.js';
import { WorkoutType } from './workout-type.enum.js';

export type UserQueryParams = {
  location?: Location;
  workoutTypes?: WorkoutType[];
  trainingLevel?: TrainingLevel;
  sortBy?: Role
}
