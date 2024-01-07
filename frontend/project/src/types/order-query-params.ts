import { OrderSortingField } from './order-sorting-field.enum';
import { Sorting } from './sorting.enum';

export type OrderQueryParams = {
  trainerId?: string;
  typeOrder?: OrderSortingField;
  sortOrder?: Sorting;
  limit?: number;
  page?: number;
}
