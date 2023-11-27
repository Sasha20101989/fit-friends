import { AuthorizationStatus, RegisterStatus } from '../const.js';
import {store} from '../store/index.js';
import { Role } from './role.enum.js';
import { TrainingLevel } from './training-level.enum.js';
import { Training } from './training.type.js';
import { WorkoutDuration } from './workout-duration.enum.js';
import { WorkoutType } from './workout-type.enum.js';

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  registerStatus: RegisterStatus;
  isSubmitting: boolean;
}

export type MainState = {
  sortingOrderMethod: string;
  specializations: WorkoutType[];
  level: TrainingLevel;
  duration: WorkoutDuration;
  file: string;
  role: Role;
}

export type DataState = {
  trainings: Training[];
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
