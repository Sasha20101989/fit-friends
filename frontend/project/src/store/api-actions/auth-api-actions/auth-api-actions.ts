import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserData } from '../../../types/user-data';
import { AppDispatch, State } from '../../../types/state';
import { AxiosInstance, AxiosResponse } from 'axios';
import { APIRoute, RegisterStatus, roleRegisterRoutes } from '../../../const';
import { AuthData } from '../../../types/auth-data';
import { Token, updateAccessToken, updateRefreshToken } from '../../../services/token';
import { setRegisterStatus } from '../../user-process/user-process.slice';
import CreateUserDto from '../../../dto/create-user.dto';
import { RegisterUserTransferData } from '../../../types/register-transfer-data';
import { Role } from '../../../types/role.enum';
import { redirectToRoute } from '../../main-process/main-process.slice';

export const checkAuthAction = createAsyncThunk<UserData | null, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try{
      const {data} = await api.get<UserData>(APIRoute.Login);
      return data;
    } catch(error) {
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
        updateAccessToken(response.data.accessToken as Token.Access);
        updateRefreshToken(response.data.refreshToken as Token.Refresh);
      }

      dispatch(checkAuthAction());

      return response.data;
    } catch (error) {
      return null;
    }
  },
);

export const registerAction = createAsyncThunk<void, RegisterUserTransferData,
{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/register',
  async (registerData, { dispatch, extra: api }) => {
    try {
      const response: AxiosResponse<CreateUserDto> = registerData.role === Role.Trainer
        ? await api.post(APIRoute.RegisterTrainer, registerData)
        : await api.post(APIRoute.RegisterUser, registerData);

      dispatch(setRegisterStatus(RegisterStatus.InProgress));
      dispatch(loginAction({ email: response.data.email, password: registerData.password }));

      const targetRoute = roleRegisterRoutes[response.data.role];

      if (targetRoute) {
        dispatch(redirectToRoute(targetRoute));
      }
    } catch (error) {
      dispatch(setRegisterStatus(RegisterStatus.Unknown));
    }
  },
);
