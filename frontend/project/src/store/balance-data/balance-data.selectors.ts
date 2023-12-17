import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { UserBalance } from '../../types/user-balance.type';

export const getBalance = (state: State): UserBalance[] => state[NameSpace.Balance].balance;
