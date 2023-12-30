import { createSlice } from '@reduxjs/toolkit';
import { RequestDataState } from '../../types/state';
import { fetchRequestsAction, updateRequestStatusAction } from '../api-actions/request-api-actions/request-api-actions';

export const initialState: RequestDataState = {
  isSubmitting: false,
  requests: [],
};

export const requestProcess = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequestsAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(fetchRequestsAction.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.requests = action.payload;
      })
      .addCase(fetchRequestsAction.rejected, (state, _action) => {
        state.isSubmitting = false;
      })
      .addCase(updateRequestStatusAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(updateRequestStatusAction.fulfilled, (state, action) => {
        state.isSubmitting = false;

        const updatedIndex = state.requests.findIndex((request) => request.id === action.payload.id);

        if (updatedIndex !== -1) {
          state.requests[updatedIndex].status = action.payload.status;
        }
      })
      .addCase(updateRequestStatusAction.rejected, (state, _action) => {
        state.isSubmitting = false;
      });
  },
});

export const {

} = requestProcess.actions;
