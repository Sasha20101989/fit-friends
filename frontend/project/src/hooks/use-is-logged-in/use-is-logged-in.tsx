import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus, getResponseStatus } from '../../store/user-process/user-process.selectors';
import { AuthorizationStatus } from '../../const';

export const useIsLoggedIn = (status: AuthorizationStatus): boolean => useAppSelector(getAuthorizationStatus) === status;
export const useIsError = (isError: boolean): boolean => useAppSelector(getResponseStatus) !== isError;
