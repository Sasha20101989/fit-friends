import { Action, Middleware } from '@reduxjs/toolkit';
import { AppRoute } from '../../const';
import browserHistory from '../../browser-history';
import { fetchTrainingsAction } from '../api-actions/trainings-api-actions/trainings-api-actions';

export const redirectOnTrainingError: Middleware = () => (next) => (action: Action) => {
  if (fetchTrainingsAction.rejected.match(action)) {
    next(action);
    browserHistory.replace(AppRoute.NotFound);
  }

  return next(action);
};
