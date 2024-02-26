import * as React from 'react';
import { fetchDataFromAPI } from '../api/api';
import axios, { AxiosError } from 'axios';
import { Filter, Product } from '../types';
import { PAGE_SIZE } from '../const';
import { getUniqueProducts } from '../utils';
import { getProductParams } from '../pages/Products/utils';
import { ProductParams } from '../pages/Products/types';

export const useProducts = (params: ProductParams = getProductParams()) => {
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [filter, setFilter] = React.useState<Filter | null>(params.filter);
  const [filteredItems, setFilteredItems] = React.useState<Product[] | null>(null);
  const [filteredIds, setFilteredIds] = React.useState<string[] | null>(null);
  const [pages, setPages] = React.useState<number>(0);
  const [page, setPage] = React.useState<number>(params.page);

  React.useEffect(() => {
    fetchIds();
  }, [filter]);

  React.useEffect(() => {
    if (filteredIds?.length) {
      getProducts();
    }
  }, [filteredIds, page]);

  React.useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set('page', String(page));
    if (filter) {
      urlSearchParams.set('category', filter.category);
      urlSearchParams.set('value', String(filter.value));
    } else {
      urlSearchParams.delete('category');
      urlSearchParams.delete('value');
    }
    const newUrl = `?${urlSearchParams.toString()}`;
    window.history.replaceState({ path: newUrl }, '', newUrl);
  }, [filter, page]);

  const getProducts = async () => {
    try {
      if (filteredIds?.length) {
        setLoading(true);
        const res = await fetchDataFromAPI('get_items', {
          ids: filteredIds.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
        });

        setFilteredItems(getUniqueProducts(res));
        setLoading(false);
      }
    } catch (error) {
      getProducts();
      handleFetchError(error);
    }
  };

  const fetchIds = async () => {
    try {
      setLoading(true);
      setFilteredIds(null);
      setFilteredItems(null);

      let filteredIds;
      if (filter) {
        filteredIds = await fetchDataFromAPI('filter', {
          [filter.category]: typeof filter.value === 'string' ? filter.value.trim() : filter.value,
        });
      } else {
        filteredIds = await fetchDataFromAPI('get_ids', {
          offset: 0,
        });
      }

      const uniqueIds: string[] = Array.from(new Set(filteredIds));

      const pages = Math.ceil(uniqueIds.length / PAGE_SIZE);
      setFilteredIds(uniqueIds);
      setPages(pages);
      setLoading(false);
    } catch (error) {
      fetchIds();
      handleFetchError(error);
    }
  };

  const handleFetchError = (error: any) => {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      if (axiosError.response?.data) {
        console.log(`Идентификатор ошибки: ${axiosError.response.data}`);
      }
    } else {
      console.error('Неизвестная ошибка:', error);
    }
  };

  const handleFilterChange = (filter: Filter | null) => {
    setFilter(filter);
    setFilteredIds(null);
    setPage(1);
  };

  return {
    filteredItems,
    isLoading,
    pages,
    page,
    fetchData: fetchIds,
    onFilterChange: handleFilterChange,
    onPageChange: setPage,
  };
};
