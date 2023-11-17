import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { mainProcess } from './main-process/main-process.slice';
import { userProcess } from './user-process/user-process.slice';
import { mainData } from './main-data/main-data.slice';

export const rootReducer = combineReducers( {
  [NameSpace.Data]: mainData.reducer,
  [NameSpace.Main]: mainProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
});
