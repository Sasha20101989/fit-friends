import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DataState } from '../../types/state';
import { fetchTrainingsAction } from '../api-actions/trainings-api-actions/trainings-api-actions';
import { Training } from '../../../../../backend/src/modules/training/types/training.type.js';

export const initialState: DataState = {
  trainings: [],
  isDataLoading: false,
  selectedTraining: null,
  isSubmitting: false,
  isSubmittingSuccess: false,
};

export const mainData = createSlice({
  name: 'data',
  initialState: initialState,
  reducers: {
    loadProducts: (state, action: PayloadAction<Training[]>) => {
      state.trainings = action.payload;
    },
    setProductsDataLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isDataLoading = action.payload;
    },
    loadProduct: (state, action: PayloadAction<Training>) => {
      state.selectedTraining = action.payload;
    },
    resetSubmittingSuccessStatus: (state, action: PayloadAction<boolean>) => {
      state.isSubmittingSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainingsAction.fulfilled, (state, action) => {
        state.trainings = action.payload;
        state.isDataLoading = false;
      });
  },
});

export const {
  loadProducts,
  setProductsDataLoadingStatus,
  loadProduct,
  resetSubmittingSuccessStatus
} = mainData.actions;
