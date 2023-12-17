import { useEffect, useMemo } from 'react';
import { UserQueryParams, fetchUsersAction } from '../../store/api-actions/user-api-actions/user-api-actions';
import { useAppDispatch } from '../index';

export function useFetchUsersEffect(readinessForWorkout: boolean, page: number, limit: number) {
  const dispatch = useAppDispatch();

  const memoizedQuery: UserQueryParams = useMemo(() => ({ readinessForWorkout, page, limit }), [readinessForWorkout, page, limit]);

  useEffect(() => {
    dispatch(fetchUsersAction(memoizedQuery));
  }, [dispatch, memoizedQuery]);
}
