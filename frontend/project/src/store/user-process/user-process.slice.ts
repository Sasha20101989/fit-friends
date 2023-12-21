import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, RegisterStatus } from '../../const';
import { UserState } from '../../types/state';
import { checkAuthAction, loginAction, registerAction } from '../api-actions/auth-api-actions/auth-api-actions';
import { fetchMyFriendsAction, fetchCurrentUserAction } from '../api-actions/user-api-actions/user-api-actions';
import { WorkoutType } from '../../types/workout-type.enum';
import { Role } from '../../types/role.enum';
import { User } from '../../types/user.interface';
import { Trainer } from '../../types/trainer.interface';
import { RegisterUserTransferData } from '../../types/register-transfer-data.js';

export const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  registerStatus: RegisterStatus.Unknown,
  isSubmitting: false,
  trainer: {
    id: undefined,
    name: '',
    email: '',
    role: null,
    avatar: '',
    gender: null,
    birthDate: undefined,
    location: null,
    backgroundImage: '',
    description: '',
    trainingLevel: null,
    workoutTypes: [],
    friends: [],
    certificate: '',
    trainerAchievements: '',
    personalTraining: false,
  },
  user: {
    id: undefined,
    name: '',
    email: '',
    role: null,
    avatar: '',
    gender: null,
    birthDate: undefined,
    location: null,
    backgroundImage: '',
    description: '',
    trainingLevel: null,
    workoutTypes: [],
    friends: [],
    readinessForWorkout: false,
    workoutDuration: null,
    caloriesToBurn: 0,
    caloriesToSpend: 0,
  },
};

export const userProcess = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setRegisterData: (state, action: PayloadAction<RegisterUserTransferData>) => {
      state.registerStatus = RegisterStatus.InProgress;

      if (action.payload.role === Role.User) {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.avatar = action.payload.avatar;
        state.user.password = action.payload.password;
        state.user.gender = action.payload.gender;
        state.user.role = action.payload.role;
        state.user.birthDate = action.payload.birthDate;
        state.user.location = action.payload.location;
      } else if (action.payload.role === Role.Trainer) {
        state.trainer.name = action.payload.name;
        state.trainer.email = action.payload.email;
        state.trainer.avatar = action.payload.avatar;
        state.trainer.password = action.payload.password;
        state.trainer.gender = action.payload.gender;
        state.trainer.role = action.payload.role;
        state.trainer.birthDate = action.payload.birthDate;
        state.trainer.location = action.payload.location;
      }
    },
    setRole: (state, action: PayloadAction<Role>) => {
      if (action.payload && action.payload === Role.User) {
        state.user.role = action.payload;
      } else if (action.payload && action.payload === Role.Trainer) {
        state.trainer.role = action.payload;
      }
    },
    setIsSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    setRegisterStatus: (state, action: PayloadAction<RegisterStatus>) => {
      state.registerStatus = action.payload;
    },
    setSpecializations: (state, action: PayloadAction<WorkoutType[]>) => {
      if (state.user.role === Role.User) {
        state.user.workoutTypes = action.payload;
      } else if (state.trainer.role === Role.Trainer) {
        state.trainer.workoutTypes = action.payload;
      }
    },
    addSpecialization: (state, action: PayloadAction<WorkoutType>) => {
      if (state.user.role === Role.User) {
        state.user.workoutTypes.push(action.payload);
      } else if (state.trainer.role === Role.Trainer) {
        state.trainer.workoutTypes.push(action.payload);
      }
    },
    removeSpecialization: (state, action: PayloadAction<WorkoutType>) => {
      if (state.user.role === Role.User) {
        state.user.workoutTypes = state.user.workoutTypes.filter(
          (spec) => spec !== action.payload
        );
      } else if (state.trainer.role === Role.Trainer) {
        state.trainer.workoutTypes = state.trainer.workoutTypes.filter(
          (spec) => spec !== action.payload
        );
      }
    },
    clearSpecializations: (state) => {
      if (state.user.role === Role.User) {
        state.user.workoutTypes = [];
      } else if (state.trainer.role === Role.Trainer) {
        state.trainer.workoutTypes = [];
      }
    },
    changeReadiessToWorkout: (state, action: PayloadAction<boolean>) => {
      if (state.user.role === Role.User) {
        state.user.readinessForWorkout = action.payload;
      }else if(state.user.role === Role.Trainer){
        state.trainer.personalTraining = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.authorizationStatus = AuthorizationStatus.Auth;

        if (action.payload && action.payload.role === Role.User) {
          state.user.id = action.payload.id;
          state.user.email = action.payload.email;
          state.user.role = action.payload.role;
        } else if (action.payload && action.payload.role === Role.Trainer) {
          state.trainer.id = action.payload.id;
          state.trainer.email = action.payload.email;
          state.trainer.role = action.payload.role;
        }
      })
      .addCase(checkAuthAction.rejected, (state, _action) => {
        state.isSubmitting = false;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.authorizationStatus = AuthorizationStatus.Auth;

        if (action.payload && action.payload.role === Role.User) {
          state.user.id = action.payload.id;
          state.user.email = action.payload.email;
          state.user.role = action.payload.role;
        } else if (action.payload && action.payload.role === Role.Trainer) {
          state.trainer.id = action.payload.id;
          state.trainer.email = action.payload.email;
          state.trainer.role = action.payload.role;
        }
      })
      .addCase(loginAction.rejected, (state, _action) => {
        state.isSubmitting = false;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(registerAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(registerAction.fulfilled, (state, _action) => {
        state.isSubmitting = false;
      })
      .addCase(registerAction.rejected, (state, _action) => {
        state.isSubmitting = false;
      })
      .addCase(fetchCurrentUserAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(fetchCurrentUserAction.fulfilled, (state, action) => {
        state.isSubmitting = false;

        if (action.payload && action.payload.role === Role.User) {
          state.user = action.payload as User;
        } else if (action.payload && action.payload.role === Role.Trainer) {
          state.trainer = action.payload as Trainer;
        }
      })
      .addCase(fetchCurrentUserAction.rejected, (state, _action) => {
        state.isSubmitting = false;
      })
      .addCase(fetchMyFriendsAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(fetchMyFriendsAction.fulfilled, (state, action) => {
        state.isSubmitting = false;

        if (state.user.role === Role.User) {
          state.user.friends = action.payload;
        } else if (state.trainer.role === Role.Trainer) {
          state.trainer.friends = action.payload;
        }
      })
      .addCase(fetchMyFriendsAction.rejected, (state, _action) => {
        state.isSubmitting = false;
      });
  },
});

export const {
  setRegisterData,
  setRole,
  changeReadiessToWorkout,
  setIsSubmitting,
  setAuthorizationStatus,
  setRegisterStatus,
  addSpecialization,
  removeSpecialization
} = userProcess.actions;
