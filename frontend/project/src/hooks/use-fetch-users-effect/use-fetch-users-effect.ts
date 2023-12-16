import { useEffect } from 'react';
import { UserQueryParams, fetchUsersAction } from '../../store/api-actions/user-api-actions/user-api-actions';
import { useAppDispatch } from '../index';

export function useFetchUsersEffect(query: UserQueryParams) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsersAction(query));
  }, [dispatch, query.page, query.limit, ...Object.values(query)]);
}
