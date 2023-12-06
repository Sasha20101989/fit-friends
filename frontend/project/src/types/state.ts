import { AuthorizationStatus, RegisterStatus } from '../const.js';
import {store} from '../store/index.js';
import { Gender } from './gender.enum.js';
import { Location } from './location.enum.js';
import { Role } from './role.enum.js';
import { Trainer } from './trainer.interface.js';
import { TrainingLevel } from './training-level.enum.js';
import { TrainingOrder } from './training-order.type.js';
import { Training } from './training.type.js';
import { User } from './user.interface.js';
import { WorkoutDuration } from './workout-duration.enum.js';
import { WorkoutType } from './workout-type.enum.js';

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  registerStatus: RegisterStatus;
  isSubmitting: boolean;
  user: User | Trainer | null;
  friends: User[];
}

export type MainState = {
  sortingOrderMethod: string;
  specializations: WorkoutType[];
  level: TrainingLevel;
  duration: WorkoutDuration;
  file: string;
  userRole: Role;
  userId: string;
  location: Location | null;
  gender: Gender | null;
  readiessToWorkout: boolean;
}

export type DataState = {
  popularTrainings: Training[];
  trainerTrainings: Training[];
  orders: TrainingOrder[],
  selectedTraining: Training | null;
  isDataLoading: boolean;
  isSubmitting: boolean;
  isSubmittingSuccess: boolean;
}

export type AppState = {
  main: MainState;
  data: DataState;
  user: UserState;
}

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
