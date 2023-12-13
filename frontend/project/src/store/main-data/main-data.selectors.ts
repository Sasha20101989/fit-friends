import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Training } from '../../types/training.type';
import { TrainingOrder } from '../../types/training-order.type';
import { Review } from '../../types/review.type';
import { User } from '../../types/user.interface';
import { Trainer } from '../../types/trainer.interface';

export const getUsers = (state: State): User[] => state[NameSpace.Data].users;
export const getSelectedUser = (state: State): User | Trainer | null => state[NameSpace.Data].selectedUser;
export const getPopularTrainings = (state: State): Training[] => state[NameSpace.Data].popularTrainings;
export const getTrainings = (state: State): Training[] => state[NameSpace.Data].trainings;
export const getSpecialForUserTrainings = (state: State): Training[] => state[NameSpace.Data].specialForUserTrainings;
export const getSpecialTrainings = (state: State): Training[] => state[NameSpace.Data].specialTrainings;
export const getTrainerTrainings = (state: State): Training[] => state[NameSpace.Data].trainerTrainings;
export const getOrders = (state: State): TrainingOrder[] => state[NameSpace.Data].orders;
export const getTraining = (state: State): Training | null => state[NameSpace.Data].selectedTraining;
export const getReviews = (state: State): Review[] => state[NameSpace.Data].reviews;
export const getLoadingStatus = (state: State): boolean => state[NameSpace.Data].isSubmitting;
