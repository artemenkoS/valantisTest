import * as React from 'react';
import { FilterForm } from '../../components/FilterForm/FilterForm';
import { Navigation } from '../../components/Navigation/Navigation';
import { Loader } from '../../components/Loader/Loader';
import { useProducts } from '../../hooks/useProducts';
import { Product } from '../../types';
import styles from './Products.module.css';
import { ProductCard } from './components/ProductCard/ProductCard';

const ProductsPage: React.FC = () => {
  const { isLoading, filteredItems, page, onPageChange, onFilterChange, pages } = useProducts();

  return (
    <div className={styles.wrapper}>
      <FilterForm onSubmit={onFilterChange} disabled={isLoading} />
      <div className={styles.ProductList}>
        {isLoading && <Loader />}
        {!isLoading && !filteredItems?.length && <h1>Товары не найдены</h1>}
        {filteredItems?.map((item: Product) => <ProductCard product={item} key={item.id} loading={isLoading} />)}
      </div>
      <Navigation page={page} onPageChange={onPageChange} pages={pages} disabled={isLoading} />
    </div>
  );
};

export default ProductsPage;
