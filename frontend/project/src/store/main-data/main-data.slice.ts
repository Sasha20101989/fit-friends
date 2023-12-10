import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DataState } from '../../types/state';
import { createTrainingAction, editTrainingAction, fetchOrdersAction, fetchPopularTrainingsAction, fetchReviewsAction, fetchTrainerTrainingsAction, fetchTrainingAction } from '../api-actions/trainings-api-actions/trainings-api-actions';
import { Training } from '../../types/training.type';

export const initialState: DataState = {
  popularTrainings: [],
  trainerTrainings: [],
  reviews: [],
  orders: [],
  isDataLoading: false,
  selectedTraining: null,
  isSubmitting: false,
  isSubmittingSuccess: false,
};

export const mainData = createSlice({
  name: 'data',
  initialState: initialState,
  reducers: {
    setTraining: (state, action: PayloadAction<Training>) => {
      state.selectedTraining = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editTrainingAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(editTrainingAction.fulfilled, (state, _action) => {
        state.isSubmitting = false;
      })
      .addCase(editTrainingAction.rejected, (state, _action) => {
        state.isSubmitting = false;
      })
      .addCase(fetchReviewsAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsAction.rejected, (state, _action) => {
        state.isSubmitting = false;
      })
      .addCase(fetchTrainingAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(fetchTrainingAction.fulfilled, (state, _action) => {
        state.isSubmitting = false;
      })
      .addCase(fetchTrainingAction.rejected, (state, _action) => {
        state.isSubmitting = false;
      })
      .addCase(createTrainingAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(createTrainingAction.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.selectedTraining = action.payload;
      })
      .addCase(createTrainingAction.rejected, (state, _action) => {
        state.isSubmitting = false;
      })
      .addCase(fetchPopularTrainingsAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(fetchPopularTrainingsAction.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.popularTrainings = action.payload;
      })
      .addCase(fetchPopularTrainingsAction.rejected, (state, _action) => {
        state.isSubmitting = false;
      })
      .addCase(fetchTrainerTrainingsAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(fetchTrainerTrainingsAction.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.trainerTrainings = action.payload;
      })
      .addCase(fetchTrainerTrainingsAction.rejected, (state, _action) => {
        state.isSubmitting = false;
      })
      .addCase(fetchOrdersAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(fetchOrdersAction.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersAction.rejected, (state, _action) => {
        state.isSubmitting = false;
      });
  },
});

export const {
  setTraining
} = mainData.actions;
