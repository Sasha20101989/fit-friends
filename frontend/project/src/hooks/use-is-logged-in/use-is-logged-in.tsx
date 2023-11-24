import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import { AuthorizationStatus } from '../../const';

export const useIsLoggedIn = (status: AuthorizationStatus): boolean => useAppSelector(getAuthorizationStatus) === status;
