import { FetchTrainingsParams, fetchTrainingsAction } from '../../store/api-actions/trainings-api-actions/trainings-api-actions';
import { Trainer } from '../../types/trainer.interface';
import { useAppDispatch } from '../index';
import { User } from './../../types/user.interface';
import { useEffect } from 'react';

export function useFetchTrainingsEffect(user: User | Trainer | null, query: FetchTrainingsParams ) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user && user.workoutTypes.length > 0) {
      dispatch(fetchTrainingsAction(query));
    }
  }, [dispatch, user, query]);
}
