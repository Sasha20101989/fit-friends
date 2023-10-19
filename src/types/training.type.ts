import type{ Trainer } from './trainer.interface.js';
import { GenderPreference } from './gender-preference.enum.js';
import { TrainingLevel } from './training-level.enum.js';
import { WorkoutDuration } from './workout-duration.enum.js';
import { WorkoutType } from './workout-type.enum.js';

export type Training = {
  name: string;
  backgroundImage: string;
  trainingLevel: TrainingLevel;
  workoutType: WorkoutType;
  workoutDuration: WorkoutDuration;
  price: number;
  calories: number;
  description: string;
  genderPreference: GenderPreference;
  video: string;
  rating: number;
  trainer: Trainer;
  specialOffer: boolean;
}
