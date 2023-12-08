import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute, RegisterStatus } from '../../../const';
import { setRegisterStatus } from '../../user-process/user-process.slice';
import UpdateUserDto from '../../../dto/update-user.dto';
import UpdateTrainerDto from '../../../dto/update-trainer.dto';
import { changeLevel, changeReadiessToWorkout, setGender, setLocation, setSpecializations } from '../../main-process/main-process.slice';
import { User } from '../../../types/user.interface';
import { Trainer } from '../../../types/trainer.interface';
import { Role } from '../../../types/role.enum';

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
    } catch (error) {
      dispatch(setRegisterStatus(RegisterStatus.Unknown));
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
    } catch (error) {
      dispatch(setRegisterStatus(RegisterStatus.Unknown));
    }
  },
);

export const fetchUserAction = createAsyncThunk<User | Trainer | null, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/fetchUser',
  async (userId: string, {dispatch, extra: api}) => {
    const { data } = await api.get<User | Trainer>(`${APIRoute.Users}/${userId}`);
    dispatch(setSpecializations(data.workoutTypes));
    dispatch(setLocation(data.location));
    dispatch(setGender(data.gender));
    dispatch(changeLevel(data.trainingLevel));

    if(data.role === Role.Trainer){
      const trainer = data as Trainer;
      dispatch(changeReadiessToWorkout(trainer.personalTraining));
    }else if(data && data.role === Role.User){
      const trained = data as User;
      dispatch(changeReadiessToWorkout(trained.readinessForWorkout));
    }

    return data;
  },
);

export const fetchFriendsAction = createAsyncThunk<User[], object, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/fetchFriends',
  async (params, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<User[]>(APIRoute.Friends, { params });
      return data;
    } catch (error) {
      return [];
    }
  },
);
