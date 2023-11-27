import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserData } from '../../../types/user-data';
import { AppDispatch, State } from '../../../types/state';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { APIRoute, AppRoute, AuthorizationStatus, RegisterStatus, roleRegisterRoutes } from '../../../const';
import { AuthData, RefreshData } from '../../../types/auth-data';
import { dropToken, saveTokens } from '../../../services/token';
import { CustomError, errorHandle } from '../../../services/error-handler';
import { setAuthorizationStatus, setRegisterStatus } from '../../user-process/user-process.slice';
import CreateUserDto from '../../../dto/create-user.dto';
import { RegisterUserTransferData } from '../../../types/register-transfer-data';
import { Role } from '../../../types/role.enum';
import UpdateUserDto from '../../../dto/update-user.dto';
import UpdateTrainerDto from '../../../dto/update-trainer.dto';
import { redirectToRoute, setRole } from '../../main-process/main-process.slice';

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
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    } catch(error) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));

      const refToken = document.cookie.replace(/(?:(?:^|.*;\s*)refreshToken\s*=\s*([^;]*).*$)|^.*$/, '$1');

      if(refToken){
        dispatch(updateRefreshToken({refreshToken: refToken, accessToken: ''}));
      }else{
        errorHandle(error as CustomError);
      }
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
        saveTokens(response.data.accessToken, response.data.refreshToken);
      }

      dispatch(checkAuthAction());
      dispatch(setRole(response.data.role));
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      return response.data;
    } catch (error) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      dispatch(setRole(Role.Undefined));
      const refToken = document.cookie.replace(/(?:(?:^|.*;\s*)refreshToken\s*=\s*([^;]*).*$)|^.*$/, '$1');

      if(refToken){
        dispatch(updateRefreshToken({refreshToken: refToken, accessToken: ''}));
      }else{
        errorHandle(error as CustomError);
        return undefined;
      }
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
      errorHandle(error as CustomError);
    }
  },
);

export const editUserAction = createAsyncThunk<
  void,
  UpdateUserDto,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/editUser',
  async (userData, {dispatch, extra: api}) => {
    try {
      await api.put<UpdateUserDto>(APIRoute.UpdateUser, userData);

      dispatch(setRegisterStatus(RegisterStatus.Done));
      dispatch(redirectToRoute(AppRoute.Main));
    } catch (error) {
      dispatch(setRegisterStatus(RegisterStatus.InProgress));
      errorHandle(error as CustomError);
    }
  },
);

export const editTrainerAction = createAsyncThunk<
  void,
  UpdateTrainerDto,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/editTrainer',
  async (trainerData, {dispatch, extra: api}) => {
    try {
      await api.put<UpdateTrainerDto>(APIRoute.UpdateTrainer, trainerData);

      dispatch(setRegisterStatus(RegisterStatus.Done));
      dispatch(redirectToRoute(AppRoute.Main));
    } catch (error) {
      dispatch(setRegisterStatus(RegisterStatus.InProgress));
      errorHandle(error as CustomError);
    }
  },
);

const BACKEND_URL = 'http://localhost:4000';

export const updateRefreshToken = createAsyncThunk<void, RefreshData, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>(
  'user/refreshToken',
  async (tokenData, { dispatch, extra: api }) => {
    try {
      const { accessToken, refreshToken} = await axios.post<APIRoute.RefreshToken, RefreshData>(
        `${BACKEND_URL}${APIRoute.RefreshToken}`,
        { refreshToken: (tokenData as { refreshToken: string }).refreshToken }
      );

      if (accessToken && refreshToken) {
        dropToken();
        saveTokens(accessToken, refreshToken);
        dispatch(checkAuthAction());
      }
    } catch (error) {
      errorHandle(error as CustomError);
    }
  },
);
