import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserData } from '../../../types/user-data';
import { AppDispatch, State } from '../../../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute, AuthorizationStatus } from '../../../const';
import { AuthData } from '../../../types/auth-data';
import { saveTokens } from '../../../services/token';
import { CustomError, errorHandle } from '../../../services/error-handler';
import { setAuthorizationStatus } from '../../user-process/user-process.slice';

class UserDto {
  public email!: string;
}

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try{
      await api.get<UserDto>(APIRoute.Login);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    } catch(error) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      errorHandle(error as CustomError);
    }
  }
);

export const loginAction = createAsyncThunk<UserData | undefined, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<UserData>(APIRoute.Login, { email, password });

      if (data.accessToken && data.refreshToken) {
        saveTokens(data.accessToken, data.refreshToken);
      }

      dispatch(checkAuthAction());
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      return data;
    } catch (error) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      errorHandle(error as CustomError);
      return undefined;
    }
  },
);
