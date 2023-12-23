import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, RegisterStatus } from '../../const';
import { UserState } from '../../types/state';
import { checkAuthAction, loginAction, registerAction } from '../api-actions/auth-api-actions/auth-api-actions';
import { fetchMyFriendsAction, fetchCurrentUserAction } from '../api-actions/user-api-actions/user-api-actions';
import { WorkoutType } from '../../types/workout-type.enum';
import { Role } from '../../types/role.enum';
import { User } from '../../types/user.interface';
import { Trainer } from '../../types/trainer.interface';
import { RegisterUserTransferData } from '../../types/register-transfer-data';
import { TrainingLevel } from '../../types/training-level.enum';
import { WorkoutDuration } from '../../types/workout-duration.enum';
import { Location } from '../../types/location.enum';
import { Gender } from '../../types/gender.enum';

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
    setCurrentUserPassword: (state, action: PayloadAction<string>) => {
      if (state.user.birthDate === Role.User) {
        state.user.password = action.payload;
      } else if (state.trainer.role === Role.Trainer) {
        state.trainer.password = action.payload;
      }
    },
    setCurrentUserBirthday: (state, action: PayloadAction<string>) => {
      if (state.user.birthDate === Role.User) {
        state.user.name = action.payload;
      } else if (state.trainer.role === Role.Trainer) {
        state.trainer.birthDate = action.payload;
      }
    },
    setCurrentUserEmail: (state, action: PayloadAction<string>) => {
      if (state.user.role === Role.User) {
        state.user.email = action.payload;
      } else if (state.trainer.role === Role.Trainer) {
        state.trainer.email = action.payload;
      }
    },
    setCurrentUserName: (state, action: PayloadAction<string>) => {
      if (state.user.role === Role.User) {
        state.user.name = action.payload;
      } else if (state.trainer.role === Role.Trainer) {
        state.trainer.name = action.payload;
      }
    },
    setCurrentUserDescription: (state, action: PayloadAction<string>) => {
      if (state.user.role === Role.User) {
        state.user.description = action.payload;
      } else if (state.trainer.role === Role.Trainer) {
        state.trainer.description = action.payload;
      }
    },
    setCurrentUserGender: (state, action: PayloadAction<Gender>) => {
      if (state.user.role === Role.User) {
        state.user.gender = action.payload;
      } else if (state.trainer.role === Role.Trainer) {
        state.trainer.gender = action.payload;
      }
    },
    setCurrentUserLocation: (state, action: PayloadAction<Location>) => {
      if (state.user.role === Role.User) {
        state.user.location = action.payload;
      } else if (state.trainer.role === Role.Trainer) {
        state.trainer.location = action.payload;
      }
    },
    setCurrentUserCertificate: (state, action: PayloadAction<string>) => {
      if (state.trainer.role === Role.Trainer) {
        state.trainer.certificate = action.payload;
      }
    },
    changeCurrentUserDuration: (state, action: PayloadAction<WorkoutDuration>) => {
      if (state.user.role === Role.User) {
        state.user.workoutDuration = action.payload;
      }
    },
    changeCurrentUserLevel: (state, action: PayloadAction<TrainingLevel>) => {
      if (state.user.role === Role.User) {
        state.user.trainingLevel = action.payload;
      } else if (state.trainer.role === Role.Trainer) {
        state.trainer.trainingLevel = action.payload;
      }
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
    setCurrentUserSpecializations: (state, action: PayloadAction<WorkoutType[]>) => {
      if (state.user.role === Role.User) {
        state.user.workoutTypes = action.payload;
      } else if (state.trainer.role === Role.Trainer) {
        state.trainer.workoutTypes = action.payload;
      }
    },
    addCurrentUserSpecialization: (state, action: PayloadAction<WorkoutType>) => {
      if (state.user.role === Role.User) {
        state.user.workoutTypes.push(action.payload);
      } else if (state.trainer.role === Role.Trainer) {
        state.trainer.workoutTypes.push(action.payload);
      }
    },
    removeCurrentUserSpecialization: (state, action: PayloadAction<WorkoutType>) => {
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
    clearCurrentUserSpecializations: (state) => {
      if (state.user.role === Role.User) {
        state.user.workoutTypes = [];
      } else if (state.trainer.role === Role.Trainer) {
        state.trainer.workoutTypes = [];
      }
    },
    changeCurrentUserReadiessToWorkout: (state, action: PayloadAction<boolean>) => {
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
