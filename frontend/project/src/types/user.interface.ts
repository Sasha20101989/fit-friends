import { BaseUser } from './base-user.type';
import { Role } from './role.enum';
import { UserBalance } from './user-balance.type';
import { WorkoutDuration } from './workout-duration.enum';


export interface User extends BaseUser {
  role: Role;
  workoutDuration: WorkoutDuration;
  caloriesToBurn: number;
  caloriesToSpend: number;
  readinessForWorkout: boolean;
  balance?: UserBalance;
}
