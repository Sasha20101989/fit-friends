import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MainState } from '../../types/state';
import { Sorting } from '../../types/sorting.enum';
import { TrainingLevel } from '../../types/training-level.enum';
import { WorkoutDuration } from '../../types/workout-duration.enum';
import browserHistory from '../../browser-history';
import { Location } from '../../types/location.enum';
import { Gender } from '../../types/gender.enum';
import { Page } from '../../types/page.enum';

const initialState: MainState = {
  sortingOrderMethod: Sorting.Ascending,
  level: TrainingLevel.Beginner,
  duration: WorkoutDuration.Short,
  file: '',
  location: null,
  gender: null,
  description: '',
  name: '',
  avatar: '',
  selectedPage: undefined,
  error: ''
};

export const mainProcess = createSlice({
  name: 'main',
  initialState: initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload;
    },
    setSelectedPage: (state, action: PayloadAction<Page | undefined>) => {
      state.selectedPage = action.payload;
    },
    setAvatar: (state, action: PayloadAction<string | undefined>) => {
      state.avatar = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setDescription: (state, action: PayloadAction<string | undefined>) => {
      state.description = action.payload;
    },
    setGender: (state, action: PayloadAction<Gender>) => {
      state.gender = action.payload;
    },
    setLocation: (state, action: PayloadAction<Location>) => {
      state.location = action.payload;
    },
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
    redirectToRoute: (_state, action: PayloadAction<string>) => {
      browserHistory.push(action.payload);
    },
  },
});
export const { setError, setSelectedPage, setAvatar, setName, setDescription, setGender, redirectToRoute, setLocation, changeFile, changeSortingOrder, changeLevel, changeDuration } = mainProcess.actions;
