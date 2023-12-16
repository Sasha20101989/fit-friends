import { Gender } from './gender.enum';
import { Location } from './location.enum';
import { TrainingLevel } from './training-level.enum';
import { User } from './user.interface';
import { WorkoutType } from './workout-type.enum';

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
