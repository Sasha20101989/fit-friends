import { Gender } from './gender.enum..js';
import { Location } from './location.enum.js';
import { TrainingLevel } from './training-level.enum.js';
import { WorkoutType } from './workout-type.enum.js';

export type BaseUser = {
  name: string;
  email: string;
  avatar?: string;
  gender: Gender;
  birthDate?: string;
  location: Location;
  backgroundImage: string;
  description?: string;
  trainingLevel: TrainingLevel;
  workoutTypes: WorkoutType[];
}
