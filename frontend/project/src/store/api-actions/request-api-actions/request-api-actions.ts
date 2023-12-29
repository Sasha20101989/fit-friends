import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../../types/state';
import { APIRoute } from '../../../const';
import { Request } from '../../../types/request.type';

export const fetchRequestsAction = createAsyncThunk<Request[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'requests/fetchRequests',
  async (_, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Request[]>(APIRoute.Requests, {});
      return data;
    } catch (error) {
      return [];
    }
  },
);
