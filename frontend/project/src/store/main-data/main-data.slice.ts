import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DataState } from '../../types/state';
import { createTrainingAction, editTrainingAction, fetchOrdersAction, fetchReviewsAction, fetchTrainerTrainingsAction, fetchTrainingAction, fetchTrainingsAction } from '../api-actions/trainings-api-actions/trainings-api-actions';
import { Training } from '../../types/training.type';
import { addToFriendsAction, fetchSelectedUserAction, fetchUsersAction, fetchUsersWithPaginationAction, removeFromFriendAction } from '../api-actions/user-api-actions/user-api-actions';
import { User } from '../../types/user.interface';

export const initialState: DataState = {
  users: [],
  selectedUser: null,
  popularTrainings: [],
  specialTrainings: [],
  specialForUserTrainings: [],
  trainerTrainings: [],
  trainings: [],
  reviews: [],
  orders: [],
  selectedTraining: null,
  isSubmitting: false,
  pagination: {
    page: undefined,
    limit: undefined
  }
};

export const mainData = createSlice({
  name: 'data',
  initialState: initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setPaginationParams: (state, action: PayloadAction<{page: number; limit: number}>) => {
      state.pagination = action.payload;
    },
    setTraining: (state, action: PayloadAction<Training>) => {
      state.selectedTraining = action.payload;
    },
    setPopularTrainings: (state, action: PayloadAction<Training[]>) => {
      state.popularTrainings = action.payload;
    },
    setTrainings: (state, action: PayloadAction<Training[]>) => {
      state.trainings = action.payload;
    },
    setSpecialTrainings: (state, action: PayloadAction<Training[]>) => {
      state.specialTrainings = action.payload;
    },
    setSpecialForUserTrainings: (state, action: PayloadAction<Training[]>) => {
      state.specialForUserTrainings = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
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
      })
      .addCase(fetchUsersWithPaginationAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(fetchUsersWithPaginationAction.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.pagination = action.meta.arg;
        state.users = action.payload;
      })
      .addCase(fetchUsersWithPaginationAction.rejected, (state, _action) => {
        state.isSubmitting = false;
      })
      .addCase(fetchSelectedUserAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(fetchSelectedUserAction.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchSelectedUserAction.rejected, (state, _action) => {
        state.isSubmitting = false;
      })
      .addCase(fetchUsersAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(fetchUsersAction.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.users = action.payload;
      })
      .addCase(fetchUsersAction.rejected, (state, _action) => {
        state.isSubmitting = false;
      })
      .addCase(editTrainingAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(editTrainingAction.fulfilled, (state, _action) => {
        state.isSubmitting = false;
      })
      .addCase(editTrainingAction.rejected, (state, _action) => {
        state.isSubmitting = false;
      })
      .addCase(fetchReviewsAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsAction.rejected, (state, _action) => {
        state.isSubmitting = false;
      })
      .addCase(fetchTrainingAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(fetchTrainingAction.fulfilled, (state, _action) => {
        state.isSubmitting = false;
      })
      .addCase(fetchTrainingAction.rejected, (state, _action) => {
        state.isSubmitting = false;
      })
      .addCase(createTrainingAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(createTrainingAction.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.selectedTraining = action.payload;
      })
      .addCase(createTrainingAction.rejected, (state, _action) => {
        state.isSubmitting = false;
      })
      .addCase(fetchTrainingsAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(fetchTrainingsAction.fulfilled, (state, action) => {
        state.isSubmitting = false;
      })
      .addCase(fetchTrainingsAction.rejected, (state, _action) => {
        state.isSubmitting = false;
      })
      .addCase(fetchTrainerTrainingsAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(fetchTrainerTrainingsAction.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.trainerTrainings = action.payload;
      })
      .addCase(fetchTrainerTrainingsAction.rejected, (state, _action) => {
        state.isSubmitting = false;
      })
      .addCase(fetchOrdersAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(fetchOrdersAction.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersAction.rejected, (state, _action) => {
        state.isSubmitting = false;
      });
  },
});

export const {
  setUsers,
  setPaginationParams,
  setTrainings,
  setSpecialForUserTrainings,
  setPopularTrainings,
  setSpecialTrainings,
  setTraining
} = mainData.actions;
