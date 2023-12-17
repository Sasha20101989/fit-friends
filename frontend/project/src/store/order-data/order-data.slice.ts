import { createSlice } from '@reduxjs/toolkit';
import { OrderDataState } from '../../types/state';
import { createOrderAction, fetchOrdersAction } from '../api-actions/order-api-actions/order-api-actions';

export const initialState: OrderDataState = {
  isSubmitting: false,
  orders: [],
};

export const orderData = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(fetchOrdersAction.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersAction.rejected, (state, _action) => {
        state.isSubmitting = false;
      })
      .addCase(createOrderAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(createOrderAction.fulfilled, (state, _action) => {
        state.isSubmitting = false;
      })
      .addCase(createOrderAction.rejected, (state, _action) => {
        state.isSubmitting = false;
      });
  },
});

export const {

} = orderData.actions;
