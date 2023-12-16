import { Subscribe } from './../../../types/subscribe.type';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute, RegisterStatus } from '../../../const';
import { setRegisterStatus } from '../../user-process/user-process.slice';
import UpdateUserDto from '../../../dto/update-user.dto';
import UpdateTrainerDto from '../../../dto/update-trainer.dto';
import { changeLevel, changeReadiessToWorkout, setAvatar, setDescription, setGender, setLocation, setName, setSpecializations } from '../../main-process/main-process.slice';
import { User } from '../../../types/user.interface';
import { Trainer } from '../../../types/trainer.interface';
import { Role } from '../../../types/role.enum';
import { Sorting } from '../../../types/sorting.enum';
import { TrainingLevel } from '../../../types/training-level.enum';
import { WorkoutType } from '../../../types/workout-type.enum';
import { Location } from '../../../types/location.enum';
import { getUsers } from '../../main-data/main-data.selectors';
import { setPaginationParams } from '../../main-data/main-data.slice';
import { Notification } from '../../../types/notification.type';

export type UserQueryParams = {
  location?: Location[];
  workoutTypes?: WorkoutType[];
  trainingLevel?: TrainingLevel;
  sortBy?: Role;
  limit?: number;
  page?: number;
  createdAtDirection?: Sorting;
  readinessForWorkout?: boolean;
}

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
    dispatch(setDescription(data.description));
    dispatch(setName(data.name));
    dispatch(setAvatar(data.avatar));

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

export const fetchMyFriendsAction = createAsyncThunk<User[], object, {
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

export const fetchMySubscribesAction = createAsyncThunk<Subscribe[], object, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/fetchSubscribes',
  async (params, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Subscribe[]>(APIRoute.Subscribes);
      return data;
    } catch (error) {
      return [];
    }
  },
);

export const addToFriendsAction = createAsyncThunk<User, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/addToFriends',
  async (userId, { dispatch, extra: api }) => {
    const { data } = await api.post<User>(`${APIRoute.Friends}/${userId}`);
    return data;
  },
);

export const addToSubscribesAction = createAsyncThunk<Subscribe, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/addToSubscribes',
  async (trainerId, { dispatch, extra: api }) => {
    const { data } = await api.post<Subscribe>(`${APIRoute.Subscribes}/trainer/${trainerId}`);
    return data;
  },
);

export const deleteFromSubscribesAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/deleteFromSubscribes',
  async (trainerId, { dispatch, extra: api }) => {
    await api.delete(`${APIRoute.Subscribes}/trainer/${trainerId}`);
  },
);

export const removeFromFriendAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/deleteFromFriends',
  async (userId, { dispatch, extra: api }) => {
    await api.delete(`${APIRoute.Friends}/${userId}`);
  },
);

export const fetchUsersAction = createAsyncThunk<User[], UserQueryParams, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/fetchUsers',
  async (params, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<User[]>(APIRoute.Users, { params });
      return data;
    } catch (error) {
      return [];
    }
  },
);

export const fetchUsersWithPaginationAction = createAsyncThunk<User[], UserQueryParams, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>(
  'user/fetchUsersWithPagination',
  async (params, { getState, dispatch, extra: api }) => {
    try {
      const state = getState();
      const currentUsers = getUsers(state);
      const { data } = await api.get<User[]>(APIRoute.Users, { params });

      if(params.page && params.limit){
        dispatch(setPaginationParams({ page: params.page, limit: params.limit }));
      }

      return [...currentUsers, ...data];
    } catch (error) {
      return [];
    }
  },
);

export const fetchSelectedUserAction = createAsyncThunk<User | Trainer | null, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSelectedUser',
  async (userId, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<User | Trainer | null>(`${APIRoute.Users}/${userId}`);
      return data;
    } catch (error) {
      return null;
    }
  },
);

export const fetchNotificationsAction = createAsyncThunk<Notification[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/fetchNotifications',
  async (_, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Notification[]>(APIRoute.Notifications);
      return data;
    } catch (error) {
      return [];
    }
  },
);

export const deleteFromNotificationsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/deleteFromNotifications',
  async (notificationId, { dispatch, extra: api }) => {
    await api.delete(`${APIRoute.Notifications}/${notificationId}`);
  },
);
