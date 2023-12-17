import { FetchTrainingsParams, fetchTrainingsAction } from '../../store/api-actions/trainings-api-actions/trainings-api-actions';
import { TrainingCategory } from '../../types/training-category.js';
import { WorkoutType } from '../../types/workout-type.enum.js';
import { useAppDispatch } from '../index';
import { useEffect, useMemo } from 'react';

export function useFetchTrainingsEffect(
  category: TrainingCategory,
  page: number,
  limit: number,
  workoutTypes: WorkoutType[] | undefined = undefined,
  isSpecial: boolean | undefined = undefined
){
  const dispatch = useAppDispatch();

  const memoizedQuery: FetchTrainingsParams = useMemo(() => ({ category, workoutTypes, page, limit, isSpecial }), [category, workoutTypes, page, limit, isSpecial]);

  useEffect(() => {
    dispatch(fetchTrainingsAction(memoizedQuery));
  }, [dispatch, memoizedQuery]);
}
