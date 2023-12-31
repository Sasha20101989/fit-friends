import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { mainProcess } from './main-process/main-process.slice';
import { userProcess } from './user-process/user-process.slice';
import { mainData } from './main-data/main-data.slice';
import { orderData } from './order-data/order-data.slice';
import { balanceData } from './balance-data/balance-data.slice';
import { requestProcess } from './request-data/request-data.slice';

export const rootReducer = combineReducers( {
  [NameSpace.Data]: mainData.reducer,
  [NameSpace.Order]: orderData.reducer,
  [NameSpace.Balance]: balanceData.reducer,
  [NameSpace.Main]: mainProcess.reducer,
  [NameSpace.UserData]: userProcess.reducer,
  [NameSpace.RequestData]: requestProcess.reducer,
});
