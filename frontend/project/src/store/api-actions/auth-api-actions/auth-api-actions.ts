import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserData } from '../../../types/user-data';
import { AppDispatch, State } from '../../../types/state';
import { AxiosInstance, AxiosResponse } from 'axios';
import { APIRoute, AppRoute, AuthorizationStatus, RegisterStatus, isAuthorization, isTrainer, roleRegisterRoutes } from '../../../const';
import { AuthData } from '../../../types/auth-data';
import { Token, updateAccessToken, updateRefreshToken } from '../../../services/token';
import { setAuthorizationStatus, setRegisterStatus } from '../../user-process/user-process.slice';
import CreateUserDto from '../../../dto/create-user.dto';
import { RegisterUserTransferData } from '../../../types/register-transfer-data';
import { Role } from '../../../types/role.enum';
import UpdateUserDto from '../../../dto/update-user.dto';
import UpdateTrainerDto from '../../../dto/update-trainer.dto';
import { redirectToRoute, setRole, setUserId } from '../../main-process/main-process.slice';
import { User } from '../../../types/user.interface';
import { Trainer } from '../../../types/trainer.interface';

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

      if(isTrainer(response.data.role) && isAuthorization(AuthorizationStatus.Auth)){
        dispatch(redirectToRoute(`${AppRoute.Trainers}/${response.data.id}`));
      }
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
      await api.put<UpdateUserDto>(APIRoute.Users, userData);

      dispatch(setRegisterStatus(RegisterStatus.Done));
      dispatch(redirectToRoute(AppRoute.Main));
    } catch (error) {
      dispatch(setRegisterStatus(RegisterStatus.InProgress));
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
    }
  },
);

export const fetchUserAction = createAsyncThunk<User | Trainer | null, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (userId: string, {dispatch, extra: api}) => {
    const { data } = await api.get<User | Trainer>(`${APIRoute.Users}/${userId}`);
    return data;
  },
);
