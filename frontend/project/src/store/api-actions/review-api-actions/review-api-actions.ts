import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../../types/state';
import { APIRoute } from '../../../const';
import { Review } from '../../../types/review.type';
import CreateReviewDto from '../../../dto/create-review.dto';

export interface FetchReviewsParams {
  trainingId: string;
}

export const createReviewAction = createAsyncThunk<Review, {trainingId: string; reviewData: CreateReviewDto}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'review/createReview',
  async (query, { dispatch, extra: api }) => {
    const { data } = await api.post<Review>(`${APIRoute.Reviews}/${query.trainingId}`, query.reviewData);
    return data;
  },
);

export const fetchReviewsAction = createAsyncThunk<Review[], FetchReviewsParams, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'review/fetchReviews',
  async (params, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Review[]>(`${APIRoute.Reviews}/${params.trainingId}`, {});
      return data;
    } catch (error) {
      return [];
    }
  },
);
