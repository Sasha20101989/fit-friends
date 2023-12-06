import { createSlice } from '@reduxjs/toolkit';
import { DataState } from '../../types/state';
import { fetchOrdersAction, fetchTrainingsAction } from '../api-actions/trainings-api-actions/trainings-api-actions';

export const initialState: DataState = {
  trainings: [],
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
      .addCase(fetchTrainingsAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(fetchTrainingsAction.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.trainings = action.payload;
      })
      .addCase(fetchTrainingsAction.rejected, (state, _action) => {
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
