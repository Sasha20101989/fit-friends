import { NameSpace } from '../../const';
import { Request } from '../../types/request.type';
import { State } from '../../types/state';

export const getRequests = (state: State): Request[] => state[NameSpace.RequestData].requests;
