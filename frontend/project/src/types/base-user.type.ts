import { Gender } from './gender.enum.js';
import { Location } from './location.enum.js';
import { TrainingLevel } from './training-level.enum.js';
import { User } from './user.interface.js';
import { WorkoutType } from './workout-type.enum.js';

export type BaseUser = {
  id?: string;
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
  friends: User[];
}
