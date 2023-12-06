import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Training } from '../../types/training.type';
import { TrainingOrder } from '../../types/training-order.type.js';

export const getTrainings = (state: State): Training[] => state[NameSpace.Data].trainings;
export const getOrders = (state: State): TrainingOrder[] => state[NameSpace.Data].orders;
