import { Sorting } from '../../../types/sorting.enum.js';

export type BalanceQueryParams = {
  limit?: number;
  page?: number;
  sortDirection?: Sorting;
}
