import React from 'react';
import { Product } from '../../../../types';
import styles from './ProductCard.module.css';
import { formatAmount } from '../../../../utils';
import { Skeleton } from './Skeleton';

interface Props {
  product: Product;
  loading?: boolean;
}

export const ProductCard: React.FC<Props> = ({ product, loading = false }) => {
  if (loading) {
    return <Skeleton />;
  }

  return (
    <div className={styles.card}>
      <div className={styles.brand}>{product.brand}</div>
      <div className={styles.product}>{product.product}</div>
      <div>
        <div className={styles.id}>ID: {product.id}</div>
        <div className={styles.price}>{formatAmount(product.price)} ₽</div>
      </div>
    </div>
  );
};
