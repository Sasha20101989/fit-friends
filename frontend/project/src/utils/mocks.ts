import { createApi } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import { CombinedState } from '@reduxjs/toolkit';
import { AuthorizationStatus, RegisterStatus } from '../const';
import { Role } from '../types/role.enum';
import { Gender } from '../types/gender.enum';
import { TrainingLevel } from '../types/training-level.enum';
import { WorkoutDuration } from '../types/workout-duration.enum';
import { Location } from '../types/location.enum';
import { Sorting } from '../types/sorting.enum';
import { TrainingOrder } from '../types/training-order.type';
import { WorkoutType } from '../types/workout-type.enum';
import { GenderPreference } from '../types/gender-preference.enum';
import { Training } from '../types/training.type';

const api = createApi();

export const mockAPI = new MockAdapter(api);

const middlewares = [thunk.withExtraArgument(api)];

export const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

export const mockState = (): CombinedState<State> => ({
  data: {
    subscribes: [],
    users: [],
    selectedUser: null,
    popularTrainings: [],
    specialTrainings: [],
    specialForUserTrainings: [],
    trainerTrainings: [],
    trainings: [],
    reviews: [],
    notifications: [],
    selectedTraining: null,
    isSubmitting: false,
    pagination: {
      page: undefined,
      limit: undefined
    }
  },
  balance: {
    isSubmitting: false,
    balance: [],
  },
  main: {
    sortingOrderMethod: Sorting.Ascending,
    level: TrainingLevel.Beginner,
    duration: WorkoutDuration.Short,
    file: '',
    location: null,
    gender: null,
    description: '',
    name: '',
    avatar: '',
    selectedPage: undefined,
    error: ''
  },
  order: {
    isSubmitting: false,
    orders: [],
  },
  user: {
    authorizationStatus: AuthorizationStatus.Unknown,
    registerStatus: RegisterStatus.Unknown,
    isSubmitting: false,
    trainer: initialTrainerState,
    user: initialUserState,
  },
  request: {
    isSubmitting: false,
    requests: [],
  }
});

export const initialUserState = {
  id: undefined,
  name: '',
  email: '',
  role: Role.Unknown,
  avatar: '',
  password: '',
  gender: Gender.Unknown,
  birthDate: undefined,
  location: Location.Unknown,
  backgroundImage: undefined,
  description: undefined,
  trainingLevel: TrainingLevel.Unknown,
  workoutTypes: [],
  friends: [],
  readinessForWorkout: false,
  workoutDuration: WorkoutDuration.Unknown,
  caloriesToBurn: 0,
  caloriesToSpend: 0,
};

export const initialTrainerState = {
  id: undefined,
  name: '',
  email: '',
  role: Role.Unknown,
  avatar: '',
  password: '',
  gender: Gender.Unknown,
  birthDate: undefined,
  location: Location.Unknown,
  backgroundImage: undefined,
  description: undefined,
  trainingLevel: TrainingLevel.Unknown,
  workoutTypes: [],
  friends: [],
  certificates: [],
  trainerAchievements: undefined,
  personalTraining: false,
};

export const orderMock: TrainingOrder = {
  id: '1',
  training: '1245',
  backgroundImage: 'some-image-url',
  price: 100,
  name: 'Training Name',
  trainingLevel: TrainingLevel.Beginner,
  workoutDuration: WorkoutDuration.Medium,
  workoutType: WorkoutType.Crossfit,
  genderPreference: GenderPreference.Men,
  video: 'video.mov',
  rating: 4.5,
  description: 'Training Description',
  totalSalesAmount: 500,
  purchasedQuantity: 10,
  calories: 200,
  specialOffer: true,
  trainer: initialTrainerState,
  createdAt: new Date()
};

export const trainingMock: Training = {
  id: '124',
  name: 'test',
  backgroundImage: 'some-image.jpg',
  trainingLevel: TrainingLevel.Amateur,
  workoutType: WorkoutType.Aerobics,
  workoutDuration: WorkoutDuration.Long,
  price: 111,
  calories: 1221,
  description: 'test description',
  genderPreference: GenderPreference.Men,
  video: 'some-video.mov',
  rating: 3,
  trainer: initialTrainerState,
  specialOffer: true,
  createdAt: '20101989',
};
