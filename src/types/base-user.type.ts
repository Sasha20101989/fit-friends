import type { UserBalance } from './user-balance.type.js';
import { Gender } from './gender.enum..js';
import { Location } from './location.enum.js';
import { TrainingLevel } from './training-level.enum.js';
import { WorkoutType } from './workout-type.enum.js';

export type BaseUser = {
  name: string;
  email: string;
  avatar: string;
  password: string;
  gender: Gender;
  birthDate?: Date | null;
  location: Location;
  backgroundImage: string;
  createdAt: Date;
  description?: string;
  trainingLevel: TrainingLevel;
  workoutTypes: WorkoutType[];
  purchasedTrainings: UserBalance[];
}