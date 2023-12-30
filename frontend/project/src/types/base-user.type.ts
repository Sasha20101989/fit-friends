import { Gender } from './gender.enum';
import { Location } from './location.enum';
import { Role } from './role.enum';
import { TrainingLevel } from './training-level.enum';
import { User } from './user.interface';
import { WorkoutType } from './workout-type.enum';

export type BaseUser = {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  avatar?: string | undefined;
  gender: Gender;
  birthDate?: string;
  location: Location;
  description?: string;
  trainingLevel: TrainingLevel;
  workoutTypes: WorkoutType[];
  friends: User[];
}
