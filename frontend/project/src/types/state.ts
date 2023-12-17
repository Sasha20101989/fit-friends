import { AuthorizationStatus, RegisterStatus } from '../const';
import {store} from '../store/index';
import { Gender } from './gender.enum';
import { Location } from './location.enum';
import { Notification } from './notification.type.js';
import { Page } from './page.enum.js';
import { Review } from './review.type';
import { Role } from './role.enum';
import { Subscribe } from './subscribe.type';
import { Trainer } from './trainer.interface';
import { TrainingLevel } from './training-level.enum';
import { TrainingOrder } from './training-order.type';
import { Training } from './training.type';
import { User } from './user.interface';
import { WorkoutDuration } from './workout-duration.enum';
import { WorkoutType } from './workout-type.enum';

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  registerStatus: RegisterStatus;
  isSubmitting: boolean;
  user: User | Trainer | null;
  myFriends: User[];
}

export type MainState = {
  sortingOrderMethod: string;
  specializations: WorkoutType[];
  level: TrainingLevel;
  duration: WorkoutDuration;
  file: string;
  currentRole: Role;
  currentUserId: string;
  location: Location | null;
  gender: Gender | null;
  readiessToWorkout: boolean;
  description: string | undefined;
  name: string;
  avatar: string | undefined;
  selectedPage: Page | undefined;
}

export type DataState = {
  subscribes: Subscribe[];
  selectedUser: User | Trainer | null;
  users: User[];
  popularTrainings: Training[];
  trainings: Training[];
  specialTrainings: Training[];
  specialForUserTrainings: Training[];
  trainerTrainings: Training[];
  reviews: Review[];
  selectedTraining: Training | null;
  isSubmitting: boolean;
  pagination: {
    page?: number | undefined;
    limit?: number | undefined;
  };
  notifications: Notification[];
}

export type OrderDataState = {
  isSubmitting: boolean;
  orders: TrainingOrder[];
}

export type AppState = {
  main: MainState;
  data: DataState;
  user: UserState;
  order: OrderDataState;
}

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
