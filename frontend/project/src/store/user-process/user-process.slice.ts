import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, RegisterStatus } from '../../const';
import { UserState } from '../../types/state';
import { checkAuthAction, loginAction, registerAction } from '../api-actions/auth-api-actions/auth-api-actions';
import { fetchMyFriendsAction, fetchCurrentUserAction, addToFriendsAction, removeFromFriendAction } from '../api-actions/user-api-actions/user-api-actions';
import { WorkoutType } from '../../types/workout-type.enum';
import { Role } from '../../types/role.enum';
import { User } from '../../types/user.interface';
import { Trainer } from '../../types/trainer.interface';
import { RegisterUserTransferData } from '../../types/register-transfer-data';
import { TrainingLevel } from '../../types/training-level.enum';
import { WorkoutDuration } from '../../types/workout-duration.enum';
import { Location } from '../../types/location.enum';
import { Gender } from '../../types/gender.enum';

export const initialUserState = {
  id: undefined,
  name: '',
  email: '',
  role: Role.Unknown,
  avatar: '',
  password: '',
  gender: Gender.Unknown,
  birthDate: undefined,
  location: Location.Unknown,
  backgroundImage: undefined,
  description: undefined,
  trainingLevel: TrainingLevel.Unknown,
  workoutTypes: [],
  friends: [],
  readinessForWorkout: false,
  workoutDuration: WorkoutDuration.Unknown,
  caloriesToBurn: 0,
  caloriesToSpend: 0,
};

export const initialTrainerState = {
  id: undefined,
  name: '',
  email: '',
  role: Role.Unknown,
  avatar: '',
  password: '',
  gender: Gender.Unknown,
  birthDate: undefined,
  location: Location.Unknown,
  backgroundImage: undefined,
  description: undefined,
  trainingLevel: TrainingLevel.Unknown,
  workoutTypes: [],
  friends: [],
  certificates: [],
  trainerAchievements: undefined,
  personalTraining: false,
};

export const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  registerStatus: RegisterStatus.Unknown,
  isSubmitting: false,
  trainer: initialTrainerState,
  user: initialUserState,
};

export const userProcess = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    removeFromFriends: (state, action: PayloadAction<string>) => {
      state.user.friends = state.user.friends.filter((friend) => friend.id !== action.payload);
      state.trainer.friends = state.trainer.friends.filter((friend) => friend.id !== action.payload);
    },
    setCurrentUserLocation: (state, action: PayloadAction<Location>) => {
      state.user.location = action.payload;
      state.trainer.location = action.payload;
    },
    setCurrentUserPassword: (state, action: PayloadAction<string>) => {
      state.user.password = action.payload;
      state.trainer.password = action.payload;
    },
    setCurrentUserBirthday: (state, action: PayloadAction<string>) => {
      state.user.birthDate = action.payload;
      state.trainer.birthDate = action.payload;
    },
    setCurrentUserEmail: (state, action: PayloadAction<string>) => {
      state.user.email = action.payload;
      state.trainer.email = action.payload;
    },
    setCurrentUserName: (state, action: PayloadAction<string>) => {
      state.user.name = action.payload;
      state.trainer.name = action.payload;
    },
    setCurrentUserDescription: (state, action: PayloadAction<string>) => {
      state.user.description = action.payload;
      state.trainer.description = action.payload;
    },
    setCurrentUserGender: (state, action: PayloadAction<Gender>) => {
      state.user.gender = action.payload;
      state.trainer.gender = action.payload;
    },
    setCurrentUserCertificate: (state, action: PayloadAction<string>) => {
      if (state.trainer.role === Role.Trainer) {
        state.trainer.certificates.push(action.payload);
      }
    },
    changeCurrentUserDuration: (state, action: PayloadAction<WorkoutDuration>) => {
      if (state.user.role === Role.User) {
        state.user.workoutDuration = action.payload;
      }
    },
    changeCurrentUserLevel: (state, action: PayloadAction<TrainingLevel>) => {
      state.user.trainingLevel = action.payload;
      state.trainer.trainingLevel = action.payload;
    },
    setCurrentUserRegisterData: (state, action: PayloadAction<RegisterUserTransferData>) => {
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
    setCurrentUserRole: (state, action: PayloadAction<Role>) => {
      if (action.payload === Role.User) {
        state.user.role = action.payload;
      } else if (action.payload === Role.Trainer) {
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
    setCurrentUserSpecializations: (state, action: PayloadAction<WorkoutType[]>) => {
      state.user.workoutTypes = action.payload;
      state.trainer.workoutTypes = action.payload;
    },
    addCurrentUserSpecialization: (state, action: PayloadAction<WorkoutType>) => {
      state.user.workoutTypes.push(action.payload);
      state.trainer.workoutTypes.push(action.payload);
    },
    removeCurrentUserSpecialization: (state, action: PayloadAction<WorkoutType>) => {
      state.user.workoutTypes = state.user.workoutTypes.filter(
        (spec) => spec !== action.payload
      );

      state.trainer.workoutTypes = state.trainer.workoutTypes.filter(
        (spec) => spec !== action.payload
      );
    },
    clearCurrentUserSpecializations: (state) => {
      state.user.workoutTypes = [];
      state.trainer.workoutTypes = [];
    },
    changeCurrentUserReadiessToWorkout: (state, action: PayloadAction<boolean>) => {
      if (state.user.role === Role.User) {
        state.user.readinessForWorkout = action.payload;
      }else if(state.trainer.role === Role.Trainer){
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
      })
      .addCase(loginAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isSubmitting = false;

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
      })
      .addCase(registerAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(registerAction.fulfilled, (state, _action) => {
        state.isSubmitting = false;
        state.registerStatus = RegisterStatus.Done;
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

        state.user.friends = action.payload;
        state.trainer.friends = action.payload;
      })
      .addCase(fetchMyFriendsAction.rejected, (state, _action) => {
        state.isSubmitting = false;
      })
      .addCase(removeFromFriendAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(removeFromFriendAction.fulfilled, (state, action) => {
        state.isSubmitting = false;
      })
      .addCase(removeFromFriendAction.rejected, (state, _action) => {
        state.isSubmitting = false;
      })
      .addCase(addToFriendsAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(addToFriendsAction.fulfilled, (state, action) => {
        state.isSubmitting = false;
      })
      .addCase(addToFriendsAction.rejected, (state, _action) => {
        state.isSubmitting = false;
      });
  },
});

export const {
  removeFromFriends,
  setCurrentUserPassword,
  setCurrentUserBirthday,
  setCurrentUserName,
  setCurrentUserEmail,
  setCurrentUserDescription,
  setCurrentUserGender,
  setCurrentUserLocation,
  setCurrentUserCertificate,
  changeCurrentUserDuration,
  changeCurrentUserLevel,
  setCurrentUserRegisterData,
  setCurrentUserRole,
  changeCurrentUserReadiessToWorkout,
  setIsSubmitting,
  setAuthorizationStatus,
  setRegisterStatus,
  addCurrentUserSpecialization,
  removeCurrentUserSpecialization
} = userProcess.actions;
