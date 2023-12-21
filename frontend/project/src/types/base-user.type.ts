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
  password?: string;
  role: Role | null;
  avatar?: string;
  gender: Gender | null;
  birthDate?: string;
  location: Location | null;
  backgroundImage: string;
  description?: string;
  trainingLevel: TrainingLevel | null;
  workoutTypes: WorkoutType[];
  friends: User[];
}
