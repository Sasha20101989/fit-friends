import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MainState } from '../../types/state';
import { Sorting } from '../../types/sorting.enum';
import { WorkoutType } from '../../types/workout-type.enum';
import { TrainingLevel } from '../../types/training-level.enum';
import { WorkoutDuration } from '../../types/workout-duration.enum';
import browserHistory from '../../browser-history';
import { AppRoute } from '../../const';

const initialState: MainState = {
  sortingOrderMethod: Sorting.Ascending,
  specializations: [],
  level: TrainingLevel.Beginner,
  duration: WorkoutDuration.Short,
  file: ''
};

export const mainProcess = createSlice({
  name: 'main',
  initialState: initialState,
  reducers: {
    changeSortingOrder: (state, action: PayloadAction<string>) => {
      state.sortingOrderMethod = action.payload;
    },
    changeLevel: (state, action: PayloadAction<TrainingLevel>) => {
      state.level = action.payload;
    },
    changeFile: (state, action: PayloadAction<string>) => {
      state.file = action.payload;
    },
    changeDuration: (state, action: PayloadAction<WorkoutDuration>) => {
      state.duration = action.payload;
    },
    addSpecialization: (state, action: PayloadAction<WorkoutType>) => {
      state.specializations.push(action.payload);
    },
    removeSpecialization: (state, action: PayloadAction<WorkoutType>) => {
      state.specializations = state.specializations.filter((spec) => spec !== action.payload);
    },
    clearSpecializations: (state) => {
      state.specializations = [];
    },
    redirectToRoute: (state, action: PayloadAction<AppRoute>) => {
      browserHistory.push(action.payload);
    },
  },
});
export const { redirectToRoute, changeFile, changeSortingOrder, addSpecialization, removeSpecialization, clearSpecializations, changeLevel, changeDuration } = mainProcess.actions;
