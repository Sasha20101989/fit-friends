import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserData } from '../../../types/user-data';
import { AppDispatch, State } from '../../../types/state';
import { AxiosInstance, AxiosResponse } from 'axios';
import { APIRoute, AuthorizationStatus, RegisterStatus, roleRegisterRoutes } from '../../../const';
import { AuthData } from '../../../types/auth-data';
import { Token, updateAccessToken, updateRefreshToken } from '../../../services/token';
import { setAuthorizationStatus, setRegisterStatus } from '../../user-process/user-process.slice';
import CreateUserDto from '../../../dto/create-user.dto';
import { RegisterUserTransferData } from '../../../types/register-transfer-data';
import { Role } from '../../../types/role.enum';
import { redirectToRoute, setRole, setUserId } from '../../main-process/main-process.slice';

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try{
      const response = await api.get<UserData>(APIRoute.Login);
      dispatch(setRole(response.data.role));
      dispatch(setUserId(response.data.id));
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    } catch(error) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<UserData | undefined, AuthData, {
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
      dispatch(setRole(response.data.role));
      dispatch(setUserId(response.data.id));
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      return response.data;
    } catch (error) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      dispatch(setRole(Role.Unknown));
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
