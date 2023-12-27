import { Gender } from './gender.enum';
import { Location } from './location.enum';
import { Role } from './role.enum';
import { TrainingLevel } from './training-level.enum';
import { WorkoutDuration } from './workout-duration.enum';
import { WorkoutType } from './workout-type.enum';

export type SignupUser = {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  gender: Gender;
  role: Role;
  birthDate?: string;
  description?: string;
  location: Location;
  backgroundImage?: string;
  trainingLevel: TrainingLevel;
  workoutTypes: WorkoutType[];
  workoutDuration: WorkoutDuration;
  caloriesToBurn: number;
  caloriesToSpend: number;
  readinessForWorkout: boolean;
}
