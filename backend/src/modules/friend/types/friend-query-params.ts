import { Sorting } from '../../../types/sorting.enum.js';

export type FriendQueryParams = {
  limit?: number;
  page?: number;
  createdAtDirection?: Sorting;
}
