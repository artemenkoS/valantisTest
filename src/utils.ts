import { Product } from './types';

export const formatAmount = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};
export const getUniqueProducts = (products: Product[]) => {
  const productMap: Record<string, Product> = {};

  for (const item of products) {
    if (!productMap[item.id]) {
      productMap[item.id] = item;
    }
  }

  return Object.values(productMap);
};
