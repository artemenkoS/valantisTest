import { Filter } from '../../types';
import { ProductParams } from './types';

export const getProductParams = (): ProductParams => {
  const searchParams = new URLSearchParams(window.location.search);
  const category = searchParams.get('category');
  const value = getFilterValue(category, searchParams.get('value'));
  const filter: Filter | null =
    category && value
      ? {
          category,
          value,
        }
      : null;
  const page = Number(searchParams.get('page')) || 1;

  return {
    filter,
    page,
  };
};

type ParamValue = string | null;

export const getFilterValue = (category: ParamValue, value: ParamValue): ParamValue | number => {
  if (!category) {
    return null;
  }

  if (category === 'price' && value !== null) {
    return Number(value) || null;
  }

  return value;
};
