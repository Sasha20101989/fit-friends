
import { GenderPreference } from './gender-preference.enum';
import { Trainer } from './trainer.interface';
import { TrainingLevel } from './training-level.enum';
import { WorkoutDuration } from './workout-duration.enum';
import { WorkoutType } from './workout-type.enum';

export type TrainingOrder = {
  id: string;
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
  specialOffer: boolean;
  trainer: Trainer;
  purchasedQuantity: number;
  totalSalesAmount: number;
  createdAt: Date;
  training: string;
}
