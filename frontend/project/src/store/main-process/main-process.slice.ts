import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MainState } from '../../types/state';
import { Sorting } from '../../types/sorting.enum';

const initialState: MainState = {
  sortingOrderMethod: Sorting.Ascending,
};

export const mainProcess = createSlice({
  name: 'main',
  initialState: initialState,
  reducers: {
    changeSortingOrder: (state, action: PayloadAction<string>) => {
      state.sortingOrderMethod = action.payload;
    },
  },
});
export const { changeSortingOrder } = mainProcess.actions;
