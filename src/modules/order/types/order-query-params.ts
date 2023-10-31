import { OrderSortingField } from './order-sorting-field.enum.js';
import { Sorting } from '../../../types/sorting.enum.js';

export type OrderQueryParams = {
  typeOrder?: OrderSortingField
  sortOrder?: Sorting
  limit?: number;
}
