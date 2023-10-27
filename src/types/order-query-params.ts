import { OrderSortingField } from './order-sorting-field.enum.js';
import { Sorting } from './sorting.enum.js';

export type OrderQueryParams = {
  typeOrder?: OrderSortingField
  sortOrder?: Sorting
}
