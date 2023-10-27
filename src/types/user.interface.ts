import type { BaseUser } from './base-user.type.js';
import { Role } from './role.enum.js';
import { UserBalance } from './user-balance.type.js';
import { WorkoutDuration } from './workout-duration.enum.js';

export interface User extends BaseUser {
  role: Role;
  workoutDuration: WorkoutDuration;
  caloriesToBurn: number;
  caloriesToSpend: number;
  readinessForWorkout: boolean;
  balance?: UserBalance;
}
