import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../../types/state';
import { APIRoute } from '../../../const';
import { CustomError, errorHandle } from '../../../services/error-handler';

import { Training } from '../../../../../../backend/src/modules/training/types/training.type.js';

export interface FetchTrainingsParams {
  limit?: number;
  types?: string[];
}

export const fetchTrainingsAction = createAsyncThunk<Training[], FetchTrainingsParams, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchTrainings',
  async (params, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Training[]>(APIRoute.Trainings, { params });
      return data;
    } catch (error) {
      errorHandle(error as CustomError);
      return [];
    }
  },
);
