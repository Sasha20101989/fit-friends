import type{ Trainer } from '../../trainer/types/trainer.interface.js';
import { GenderPreference } from '../../../types/gender-preference.enum.js';
import { TrainingLevel } from '../../../types/training-level.enum.js';
import { WorkoutDuration } from '../../../types/workout-duration.enum.js';
import { WorkoutType } from '../../../types/workout-type.enum.js';

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
