import { GenderPreference } from './types/gender-preference.enum';
import { Gender } from './types/gender.enum';
import { Role } from './types/role.enum';

export enum NameSpace {
  Data = 'data',
  Order = 'order',
  Main = 'main',
  User = 'user',
  Balance = 'balance'
}

export enum HTTP_CODE {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
}

export enum APIRoute {
  Trainings = '/trainings',
  Login = '/users/login',
  RegisterUser = '/users/register',
  RegisterTrainer = '/trainers/register',
  Logout = '/users/logout',
  UpdateTrainer = '/trainers',
  RefreshToken = '/users/refresh',
  Users = '/users',
  Friends = '/friends',
  Orders = '/orders',
  Reviews = '/reviews/training',
  Notifications = '/notifications',
  Subscribes = '/subscribes',
  Balance = '/balance'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum RegisterStatus {
  InProgress = 'IN_PROGRESS',
  Done = 'DONE',
  Unknown = 'UNKNOWN'
}

export enum AppRoute {
  Main = '/',
  Login = '/login',
  ParentRegister = '/register',
  Logout = '/logout',
  NotFound = '*',
  MainRegister = '/home/register',
  RegisterTrainer = '/register/questionnaire/trainer',
  RegisterUser = '/register/questionnaire/user',
  Trainers = '/trainers',
  CreateTraining = '/training-create',
  Trainings = '/trainings',
  Orders = '/orders',
  UserPurchases = '/my-purchases',
  UsersCatalog = '/users/catalog',
  TrainingsCatalog = 'trainings/catalog',
  Users = '/users',
  TrainerRoom = '/trainer/room',
  UserRoom = '/user/room',
  TrainerFriends = '/trainer/friends',
  UserFriends = '/user/friends',
}

export const URL_USER_MARKER = '/img/svg/pin-user.svg';

export const isValidPassword = (password: string): boolean => {
  const regex = /^.{6,12}$/;
  return regex.test(password);
};

export const MAX_SPECIALIZATIONS_COUNT = 3;
export const MAX_SPECIAL_TRAININGS_COUNT = 3;
export const MAX_POPULAR_TRAININGS_COUNT = 4;
export const MAX_LOOK_FOR_COMPANY_COUNT = 4;
export const MAX_TRAINER_CARD_TRAININGS_COUNT = 4;
export const MAX_USERS_COUNT = 6;
export const MAX_TRAININGS_COUNT = 6;
export const MAX_BALANCE_COUNT = 8;
export const DISCOUNT_PERCENTAGE = 0.9;

export const REVIEW_TEXT_CONSTRAINTS = {
  MIN: 100,
  MAX: 1024,
};

export const RATING_CONSTRAINTS = {
  MIN: 1,
  MAX: 5,
};

export const isAuthorization = (status: AuthorizationStatus) =>
  status === AuthorizationStatus.Auth;

export const isAuthorizationUnknown = (status: AuthorizationStatus, role: Role) =>
  status === AuthorizationStatus.Unknown && role === Role.Unknown;

export const RING_LOADER_COLOR = '#123abc';

export const roleRegisterRoutes: Record<Role, AppRoute> = {
  [Role.User]: AppRoute.RegisterUser,
  [Role.Trainer]: AppRoute.RegisterTrainer,
  [Role.Unknown]: AppRoute.Login,
};

export const isRegister = (status: RegisterStatus) =>
  status === RegisterStatus.InProgress;

export const isRegisterUnknown = (status: RegisterStatus) =>
  status === RegisterStatus.Unknown;

export const isUser = (role: Role) =>
  role === Role.User;

export const isTrainer = (role: Role) =>
  role === Role.Trainer;

export function capitalizeFirstLetter(str: string): string {
  if (str.length === 0) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function genderToPreference(gender: Gender): GenderPreference {
  switch (gender) {
    case Gender.Female:
      return GenderPreference.Women;
    case Gender.Male:
      return GenderPreference.Men;
    default:
      return GenderPreference.All;
  }
}

export function preferenceToGender(preference: GenderPreference): Gender {
  switch (preference) {
    case GenderPreference.Women:
      return Gender.Female;
    case GenderPreference.Men:
      return Gender.Male;
    default:
      return Gender.Other;
  }
}
