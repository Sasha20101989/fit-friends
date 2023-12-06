import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Training } from '../../types/training.type';
import { TrainingOrder } from '../../types/training-order.type.js';

export const getPopularTrainings = (state: State): Training[] => state[NameSpace.Data].popularTrainings;
export const getTrainerTrainings = (state: State): Training[] => state[NameSpace.Data].trainerTrainings;
export const getOrders = (state: State): TrainingOrder[] => state[NameSpace.Data].orders;
