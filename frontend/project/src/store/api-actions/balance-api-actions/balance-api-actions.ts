import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../../types/state';
import { APIRoute } from '../../../const';
import { UserBalance } from '../../../types/user-balance.type';
import { Sorting } from '../../../types/sorting.enum';
import CreateBalanceDto from '../../../dto/create-balance.dto';
import UpdateBalanceDto from '../../../dto/update-balance.dto';

export type BalanceQueryParams = {
  limit?: number;
  page?: number;
  createdAtDirection?: Sorting;
}

export const updateBalanceAction = createAsyncThunk<UserBalance, {trainingId: string; balanceData: UpdateBalanceDto}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'balance/updateBalance',
  async (query, { dispatch, extra: api }) => {
    const { data } = await api.post<UserBalance>(`${APIRoute.Balance}/training/${query.trainingId}`, query.balanceData);
    return data;
  },
);

export const addTrainingInBalanceAction = createAsyncThunk<UserBalance, {trainingId: string; balanceData: CreateBalanceDto}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'balance/createBalance',
  async (query, { dispatch, extra: api }) => {
    const { data } = await api.post<UserBalance>(`${APIRoute.Balance}/training/${query.trainingId}`, query.balanceData);
    return data;
  },
);

export const fetchBalanceAction = createAsyncThunk<UserBalance[], BalanceQueryParams, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'balance/fetchBalance',
  async (query, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<UserBalance[]>(APIRoute.Balance, {params: query});
      return data;
    } catch (error) {
      return [];
    }
  },
);
