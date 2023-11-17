import type { BaseUser } from '../../../types/base-user.type.js';
import { Role } from '../../../types/role.enum.js';
import { UserBalance } from './user-balance.type.js';
import { WorkoutDuration } from '../../../types/workout-duration.enum.js';

export interface User extends BaseUser {
  role: Role;
  workoutDuration: WorkoutDuration;
  caloriesToBurn: number;
  caloriesToSpend: number;
  readinessForWorkout: boolean;
  balance?: UserBalance;
}
