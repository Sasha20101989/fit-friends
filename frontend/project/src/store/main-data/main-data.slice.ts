import { createSlice } from '@reduxjs/toolkit';
import { DataState } from '../../types/state';
import { createTrainingAction, fetchOrdersAction, fetchPopularTrainingsAction, fetchTrainerTrainingsAction } from '../api-actions/trainings-api-actions/trainings-api-actions';

export const initialState: DataState = {
  popularTrainings: [],
  trainerTrainings: [],
  orders: [],
  isDataLoading: false,
  selectedTraining: null,
  isSubmitting: false,
  isSubmittingSuccess: false,
};

export const mainData = createSlice({
  name: 'data',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTrainingAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(createTrainingAction.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.selectedTraining = action.payload;
      })
      .addCase(createTrainingAction.rejected, (state, _action) => {
        state.isSubmitting = true;
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
} = mainData.actions;
