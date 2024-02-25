import { Filter } from '../../types';

export interface ProductParams {
  filter: Filter | null;
  page: number;
}
