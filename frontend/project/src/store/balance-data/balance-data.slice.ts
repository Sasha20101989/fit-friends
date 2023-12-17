import { createSlice } from '@reduxjs/toolkit';
import { BalanceDataState } from '../../types/state';
import { addTrainingInBalanceAction, fetchBalanceAction, updateBalanceAction } from '../api-actions/balance-api-actions/balance-api-actions';

export const initialState: BalanceDataState = {
  isSubmitting: false,
  balance: [],
};

export const balanceData = createSlice({
  name: 'balance',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalanceAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(fetchBalanceAction.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.balance = action.payload;
      })
      .addCase(fetchBalanceAction.rejected, (state, _action) => {
        state.isSubmitting = false;
      })
      .addCase(addTrainingInBalanceAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(addTrainingInBalanceAction.fulfilled, (state, action) => {
        state.isSubmitting = false;
      })
      .addCase(addTrainingInBalanceAction.rejected, (state, _action) => {
        state.isSubmitting = false;
      })
      .addCase(updateBalanceAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(updateBalanceAction.fulfilled, (state, _action) => {
        state.isSubmitting = false;
      })
      .addCase(updateBalanceAction.rejected, (state, _action) => {
        state.isSubmitting = false;
      });
  },
});

export const {

} = balanceData.actions;
