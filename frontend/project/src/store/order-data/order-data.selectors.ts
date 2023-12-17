import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { TrainingOrder } from '../../types/training-order.type';

export const getOrders = (state: State): TrainingOrder[] => state[NameSpace.Order].orders;
