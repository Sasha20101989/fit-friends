import { AuthorizationStatus, NameSpace, RegisterStatus } from '../../const';
import { State } from '../../types/state';
import { Trainer } from '../../types/trainer.interface';
import { User } from '../../types/user.interface';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getSubmittingStatus = (state: State): boolean => state[NameSpace.User].isSubmitting;
export const getRegisterStatus = (state: State): RegisterStatus => state[NameSpace.User].registerStatus;
export const getUser = (state: State): User | Trainer | null => state[NameSpace.User].user;
export const getMyFriends = (state: State): User[] | [] => state[NameSpace.User].myFriends;
