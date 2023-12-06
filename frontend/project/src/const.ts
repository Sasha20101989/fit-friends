import { Role } from './types/role.enum';

export enum NameSpace {
  Data = 'data',
  Main = 'main',
  User = 'user',
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
  Friends = '/friends'
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
  TrainerRoom = '/trainers/:id',
  Trainers = '/trainers',
  CreateTraining = '/training-create',
  Trainings = '/trainings',
  Orders = '/orders',
  Trainer = '/trainer',
  UserFriends = '/user/my-friends',
  UserPurchases = '/my-purchases',
  UserRoom = '/user/home',
  UsersCatalog = 'users/catalog',
  UserCard = '/users/user-card',
  TrainingsCatalog = 'trainings/catalog',
  Friends = '/friends'
}

export const isValidPassword = (password: string): boolean => {
  const regex = /^.{6,12}$/;
  return regex.test(password);
};

export const MAX_SPECIALIZATIONS_COUNT = 3;

export const isAuthorization = (status: AuthorizationStatus) =>
  status === AuthorizationStatus.Auth;

export const isAuthorizationUnknown = (status: AuthorizationStatus) =>
  status === AuthorizationStatus.Unknown;

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
