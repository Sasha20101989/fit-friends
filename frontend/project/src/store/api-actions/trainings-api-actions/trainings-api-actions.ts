import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../../types/state';
import { APIRoute } from '../../../const';
import { Training } from '../../../types/training.type';

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
      return [];
    }
  },
);
