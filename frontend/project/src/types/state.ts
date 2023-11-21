import {store} from '../store/index.js';
import { Training } from './training.type.js';

export type UserState = {
  authorizationStatus: string;
  isSubmitting: boolean;
}

export type MainState = {
  sortingOrderMethod: string;
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
