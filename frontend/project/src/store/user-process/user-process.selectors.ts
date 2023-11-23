import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getAuthorizationStatus = (state: State): string => state[NameSpace.User].authorizationStatus;
export const getResponseStatus = (state: State): boolean => state[NameSpace.User].isError;
export const getSubmittingStatus = (state: State): boolean => state[NameSpace.User].isSubmitting;
