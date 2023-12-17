import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../../types/state';
import { APIRoute } from '../../../const';
import { TrainingOrder } from '../../../types/training-order.type';
import { OrderBuy } from '../../../types/order-buy';
import CreateOrderDto from '../../../dto/create-order.dto';

export interface FetchOrderParams {
  trainingId: string;
}

export const createOrderAction = createAsyncThunk<OrderBuy, {trainingId: string; orderData: CreateOrderDto}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'order/createOrder',
  async (query, { dispatch, extra: api }) => {
    const { data } = await api.post<OrderBuy>(`${APIRoute.Orders}/${query.trainingId}`, query.orderData);
    return data;
  },
);

export const fetchOrdersAction = createAsyncThunk<TrainingOrder[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'order/fetchOrders',
  async (trainerId: string, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<TrainingOrder[]>(`${APIRoute.Orders}/trainer-room/${trainerId}`, {});
      return data;
    } catch (error) {
      return [];
    }
  },
);
