import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MainState } from '../../types/state';
import { Sorting } from '../../types/sorting.enum';
import { WorkoutType } from '../../types/workout-type.enum';
import { TrainingLevel } from '../../types/training-level.enum';
import { WorkoutDuration } from '../../types/workout-duration.enum';
import browserHistory from '../../browser-history';
import { Role } from '../../types/role.enum';
import { Location } from '../../types/location.enum';
import { Gender } from '../../types/gender.enum';
import { Page } from '../../types/page.enum';

const initialState: MainState = {
  sortingOrderMethod: Sorting.Ascending,
  specializations: [],
  level: TrainingLevel.Beginner,
  duration: WorkoutDuration.Short,
  file: '',
  currentRole: Role.Unknown,
  currentUserId: '',
  location: null,
  gender: null,
  readiessToWorkout: false,
  description: '',
  name: '',
  avatar: '',
  selectedPage: undefined
};

export const mainProcess = createSlice({
  name: 'main',
  initialState: initialState,
  reducers: {
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
    changeReadiessToWorkout: (state, action: PayloadAction<boolean>) => {
      state.readiessToWorkout = action.payload;
    },
    setRole: (state, action: PayloadAction<Role>) => {
      state.currentRole = action.payload;
    },
    setGender: (state, action: PayloadAction<Gender>) => {
      state.gender = action.payload;
    },
    setLocation: (state, action: PayloadAction<Location>) => {
      state.location = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.currentUserId = action.payload;
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
    setSpecializations: (state, action: PayloadAction<WorkoutType[]>) => {
      state.specializations = action.payload;
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
    redirectToRoute: (_state, action: PayloadAction<string>) => {
      browserHistory.push(action.payload);
    },
  },
});
export const { setSelectedPage, setAvatar, setName, setDescription, changeReadiessToWorkout, setRole, setGender, setUserId, redirectToRoute, setLocation, changeFile, changeSortingOrder, addSpecialization, removeSpecialization, clearSpecializations, setSpecializations, changeLevel, changeDuration } = mainProcess.actions;
