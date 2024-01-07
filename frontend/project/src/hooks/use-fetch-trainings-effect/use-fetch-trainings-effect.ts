import { FetchTrainingsParams, fetchTrainingsAction } from '../../store/api-actions/trainings-api-actions/trainings-api-actions';
import { getCurrentUser } from '../../store/user-process/user-process.selectors';
import { TrainingCategory } from '../../types/training-category';
import { useAppDispatch, useAppSelector } from '../index';
import { useEffect, useMemo } from 'react';

export function useFetchTrainingsEffect(
  category: TrainingCategory,
  page: number,
  limit: number,
  isSpecial: boolean | undefined = undefined
){
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(getCurrentUser);

  const workoutTypes = currentUser ? currentUser.workoutTypes : undefined;

  const memoizedQuery: FetchTrainingsParams = useMemo(() => ({ category, workoutTypes, page, limit, isSpecial }), [category, workoutTypes, page, limit, isSpecial]);

  useEffect(() => {
    dispatch(fetchTrainingsAction(memoizedQuery));
  }, [dispatch, memoizedQuery]);
}
