export interface Product {
  product: string;
  price: number;
  id: string;
  brand: string;
}

export interface Filter {
  category: string;
  value: string | number;
}

export type RequestMethod = 'get_ids' | 'get_items' | 'get_fields' | 'filter';
