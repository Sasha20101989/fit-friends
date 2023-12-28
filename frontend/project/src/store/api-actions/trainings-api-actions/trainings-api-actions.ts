import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../../types/state';
import { APIRoute } from '../../../const';
import { Training } from '../../../types/training.type';
import CreateTrainingDto from '../../../dto/create-training.dto';
import { setPopularTrainings, setSpecialForUserTrainings, setSpecialTrainings, setTraining, setTrainings } from '../../main-data/main-data.slice';
import UpdateTrainingDto from '../../../dto/update-training.dto';
import { WorkoutDuration } from '../../../types/workout-duration.enum';
import { WorkoutType } from '../../../types/workout-type.enum';
import { Sorting } from '../../../types/sorting.enum';
import { TrainingCategory } from '../../../types/training-category';

export interface FetchTrainingsParams {
  trainer?: string;
  minPrice?: number;
  maxPrice?: number;
  minCalories?: number;
  maxCalories?: number;
  rating?: string;
  workoutDuration?: WorkoutDuration[];
  workoutTypes?: WorkoutType[];
  sortByPrice?: Sorting;
  limit?: number;
  page?: number;
  createdAtDirection?: Sorting;
  category?: TrainingCategory;
  isSpecial?: boolean;
}

export interface FetchTrainingParams {
  trainingId: string;
}

export const fetchTrainingsAction = createAsyncThunk<Training[], FetchTrainingsParams, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchTrainings',
  async (params, { dispatch, extra: api }) => {
    try {
      const { category, ...restParams } = params;
      const { data } = await api.get<Training[]>(APIRoute.Trainings, { params: restParams });

      if (category === TrainingCategory.FOR_USER) {
        dispatch(setSpecialForUserTrainings(data));
      } else if (category === TrainingCategory.SPECIAL) {
        dispatch(setSpecialTrainings(data));
      } else if (category === TrainingCategory.POPULAR) {
        dispatch(setPopularTrainings(data));
      } else if (category === TrainingCategory.BASE) {
        dispatch(setTrainings(data));
      }

      return data;
    } catch (error) {
      return [];
    }
  },
);

export const fetchTrainerTrainingsAction = createAsyncThunk<Training[], FetchTrainingsParams, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchTrainerTrainings',
  async (params, { dispatch, extra: api }) => {
    try {
      if(!params.trainer){
        return [];
      }

      const { data } = await api.get<Training[]>(`${APIRoute.Trainings}/trainer-room/${params.trainer}`, { params });
      return data;
    } catch (error) {
      return [];
    }
  },
);

export const createTrainingAction = createAsyncThunk<Training | null, CreateTrainingDto, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/createTraining',
  async (trainingData: CreateTrainingDto, { dispatch, extra: api }) => {
    try {
      const { video: {name}, ...restParams } = trainingData;
      const { data } = await api.post<Training>(`${APIRoute.Trainings}/trainer-room`, {...restParams, video: name});

      if(data.id){
        const postVideoApiRoute = `${APIRoute.Trainings}/${data.id}/video`;

        const formData = new FormData();

        formData.append('video', trainingData.video);

        await api.post(postVideoApiRoute, formData);
      }

      return data;
    } catch (error) {
      return null;
    }
  },
);

export const fetchTrainingAction = createAsyncThunk<Training | null, FetchTrainingParams, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchTraining',
  async (params, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Training>(`${APIRoute.Trainings}/${params.trainingId}`);
      dispatch(setTraining(data));
      return data;
    } catch (error) {
      return null;
    }
  },
);

export const editTrainingAction = createAsyncThunk<
  Training | null,
  UpdateTrainingDto,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/editTraining',
  async (trainingData, {dispatch, extra: api}) => {
    try {
      if(!trainingData.id){
        return null;
      }

      const { data } = await api.put<Training>(`${APIRoute.Trainings}/trainer-room/${trainingData.id}`, trainingData);

      dispatch(setTraining(data));

      return data;
    } catch (error) {
      return null;
    }
  },
);
