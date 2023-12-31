import { AuthorizationStatus, NameSpace, RegisterStatus } from '../../const';
import { Role } from '../../types/role.enum';
import { State } from '../../types/state';
import { Trainer } from '../../types/trainer.interface';
import { User } from '../../types/user.interface';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.UserData].authorizationStatus;
export const getSubmittingStatus = (state: State): boolean => state[NameSpace.UserData].isSubmitting;
export const getRegisterStatus = (state: State): RegisterStatus => state[NameSpace.UserData].registerStatus;

export const getCurrentUser = (state: State): User | Trainer | null => {
  const userState = state[NameSpace.UserData];

  if (userState.user?.role !== Role.Unknown) {
    return userState.user;
  }

  if (userState.trainer?.role !== Role.Unknown) {
    return userState.trainer;
  }

  return null;
};

export const getCurrentUserFriends = (state: State): User[] | Trainer[] | null => {
  const currentUser = getCurrentUser(state);

  if (currentUser) {
    return currentUser.friends;
  }

  return null;
};
