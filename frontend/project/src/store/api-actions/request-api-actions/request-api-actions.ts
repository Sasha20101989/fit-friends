import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../../types/state';
import { APIRoute } from '../../../const';
import { Request } from '../../../types/request.type';
import { RequestStatus } from '../../../types/request-status.enum';

export type RequestQueryParams = {
  requestId: string;
  status: RequestStatus;
}

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

export const updateRequestStatusAction = createAsyncThunk<Request, RequestQueryParams, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'requests/updateRequestStatus',
  async (params, { dispatch, extra: api }) => {
    const { data } = await api.patch<Request>(`${APIRoute.Requests}/${params.requestId}`, {status: params.status});
    return data;
  },
);
