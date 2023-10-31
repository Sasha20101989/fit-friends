import { Location } from '../../../types/location.enum.js';
import { Role } from '../../../types/role.enum.js';
import { TrainingLevel } from '../../../types/training-level.enum.js';
import { WorkoutType } from '../../../types/workout-type.enum.js';

export type UserQueryParams = {
  location?: Location;
  workoutTypes?: WorkoutType[];
  trainingLevel?: TrainingLevel;
  sortBy?: Role;
  limit?: number;
  page?: number;
}
