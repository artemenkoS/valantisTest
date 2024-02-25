import styles from './ProductCard.module.css';

export const Skeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.brandSkeleton}></div>
      <div className={styles.productSkeleton}></div>
      <div className={styles.details}>
        <div className={styles.idSkeleton}></div>
        <div className={styles.priceSkeleton}></div>
      </div>
    </div>
  );
};
