import { UserBalance } from './user-balance.type';
import { WorkoutDuration } from './workout-duration.enum';

export type DynamicUserProperties = {
  workoutDuration: WorkoutDuration;
  caloriesToBurn: number;
  caloriesToSpend: number;
  readinessForWorkout: boolean;
  balance?: UserBalance;
};

export type DynamicTrainerProperties = {
  certificates: string[];
  trainerAchievements?: string;
  personalTraining: boolean;
};

export type DynamicProperties = DynamicUserProperties | DynamicTrainerProperties;
