import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserData } from '../../../types/user-data';
import { AppDispatch, State } from '../../../types/state';
import { AxiosInstance, AxiosResponse } from 'axios';
import { APIRoute, AppRoute, AuthorizationStatus } from '../../../const';
import { AuthData } from '../../../types/auth-data';
import { updateAccessToken, updateRefreshToken } from '../../../services/token';
import { setAuthorizationStatus } from '../../user-process/user-process.slice';
import CreateUserDto from '../../../dto/create-user.dto';
import { Role } from '../../../types/role.enum';
import { redirectToRoute } from '../../main-process/main-process.slice';
import CreateTrainerDto from '../../../dto/create-trainer.dto';
import { User } from '../../../types/user.interface';
import { Trainer } from '../../../types/trainer.interface';

export const checkAuthAction = createAsyncThunk<UserData | null, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try{
      const {data} = await api.get<UserData>(APIRoute.Login);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      return data;
    } catch(error) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      return null;
    }
  }
);

export const loginAction = createAsyncThunk<UserData | null, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    try {
      const response = await api.post<UserData>(APIRoute.Login, { email, password });

      if (response.data.accessToken && response.data.refreshToken) {
        updateAccessToken(response.data.accessToken);
        updateRefreshToken(response.data.refreshToken);
      }

      dispatch(checkAuthAction());

      if(response.data.role === Role.Trainer){
        dispatch(redirectToRoute(`${AppRoute.TrainerRoom}/${response.data.id}`));
      }

      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Main));

      return response.data;
    } catch (error) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      return null;
    }
  },
);

export const registerAction = createAsyncThunk<void, CreateUserDto | CreateTrainerDto,
{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/register',
  async (registerData, { dispatch, extra: api }) => {
    const response: AxiosResponse<User | Trainer> = registerData.role === Role.Trainer
      ? await api.post(APIRoute.RegisterTrainer, registerData)
      : await api.post(APIRoute.RegisterUser, registerData);

    dispatch(loginAction({ email: response.data.email, password: registerData.password }));
  },
);
