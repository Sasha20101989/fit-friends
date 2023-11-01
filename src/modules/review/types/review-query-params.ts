import { Sorting } from "../../../types/sorting.enum.js";

export type ReviewQueryParams = {
  limit?: number;
  page?: number;
  sortDirection?: Sorting;
}
