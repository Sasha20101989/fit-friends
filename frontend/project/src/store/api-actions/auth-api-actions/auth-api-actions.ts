import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserData } from '../../../types/user-data';
import { AppDispatch, State } from '../../../types/state';
import { AxiosInstance, AxiosResponse } from 'axios';
import { APIRoute, AuthorizationStatus } from '../../../const';
import { AuthData } from '../../../types/auth-data';
import { saveTokens } from '../../../services/token';
import { CustomError, errorHandle } from '../../../services/error-handler';
import { setAuthorizationStatus, setIsError } from '../../user-process/user-process.slice';
import CreateUserDto from '../../../dto/create-user.dto';
import { RegisterUserTransferData } from '../../../types/register-transfer-data';
import { Role } from '../../../types/role.enum';
import UpdateUserDto from '../../../dto/update-user.dto.js';
import UpdateTrainerDto from '../../../dto/update-trainer.dto.js';

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
  async ({ email, password }, { dispatch, extra: api }) => {
    try {
      const response: AxiosResponse<UserData> = await api.post(APIRoute.Login, { email, password });

      if (response.data.accessToken && response.data.refreshToken) {
        saveTokens(response.data.accessToken, response.data.refreshToken);
      }

      dispatch(checkAuthAction());
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      return response.data;
    } catch (error) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      errorHandle(error as CustomError);
      return undefined;
    }
  },
);

export const registerAction = createAsyncThunk<CreateUserDto | undefined, RegisterUserTransferData,
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

      dispatch(loginAction({ email: response.data.email, password: registerData.password }));
      return response.data;
    } catch (error) {
      dispatch(setIsError(true));
      errorHandle(error as CustomError);
      return undefined;
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
  'data/editProduct',
  async (userData, {dispatch, extra: api}) => {
    try {
      await api.put<UpdateUserDto>(APIRoute.UpdateUser, userData);

      // if (postData.status === HTTP_CODE.OK && productData.image) {
      //   const postImageApiRoute = `${APIRoute.Products}/${productData.id}/image`;
      //   await api.post(postImageApiRoute, adaptImageToServer(productData.image), {
      //     headers: {'Content-Type': 'multipart/form-data'},
      //   });
      // }

      //dispatch(redirectToRoute(`${AppRoute.EditProduct}/${productData.id}`));
    } catch (error) {
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
  'data/editProduct',
  async (trainerData, {dispatch, extra: api}) => {
    try {
      await api.put<UpdateUserDto>(APIRoute.UpdateTrainer, trainerData);

      // if (postData.status === HTTP_CODE.OK && productData.image) {
      //   const postImageApiRoute = `${APIRoute.Products}/${productData.id}/image`;
      //   await api.post(postImageApiRoute, adaptImageToServer(productData.image), {
      //     headers: {'Content-Type': 'multipart/form-data'},
      //   });
      // }

      //dispatch(redirectToRoute(`${AppRoute.EditProduct}/${productData.id}`));
    } catch (error) {
      errorHandle(error as CustomError);
    }
  },
);
