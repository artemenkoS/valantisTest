import * as React from 'react';
import { Filter } from '../../types';
import { NavButton } from '../NavButton/NavButton';
import styles from './FilterForm.module.css';
import { ReactComponent as ArrowDownIcon } from '../../assets/arrowDown.svg';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';

interface Props {
  disabled?: boolean;
  onSubmit: (values: Filter | null) => void;
}

const options = [
  { value: 'product', label: 'Продукт' },
  { value: 'brand', label: 'Бренд' },
  { value: 'price', label: 'Стоимость' },
];

export const FilterForm: React.FC<Props> = React.memo(({ disabled, onSubmit }) => {
  const [state, setState] = React.useState<Filter>({
    category: 'product',
    value: '',
  });

  const searchParams = new URLSearchParams(window.location.search);
  const categoryQueryParam = searchParams.get('category');
  const valueQueryParam = searchParams.get('value');

  React.useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      category: categoryQueryParam || 'product',
      value: valueQueryParam || '',
    }));
  }, []);

  const handleSubmit = React.useCallback(() => {
    onSubmit(state.value !== '' ? state : null);
  }, [state, onSubmit]);

  const handleReset = React.useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      value: '',
    }));
    onSubmit(null);
  }, [onSubmit]);

  const handleCategoryChange = React.useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setState((prevState) => ({
      ...prevState,
      category: event.target.value,
      value: '',
    }));
  }, []);

  const handleValueChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      const parsedValue: number | string = state.category === 'price' && newValue ? Number(newValue) : newValue;

      setState((prevState) => ({
        ...prevState,
        value: parsedValue,
      }));
    },
    [state.category]
  );

  return (
    <>
      <div className={styles.navigation}>
        <label className={styles.selectWrapper}>
          <select className={styles.select} name="category" value={state.category} onChange={handleCategoryChange}>
            {options.map((option) => (
              <option className={styles.item} key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ArrowDownIcon className={styles.arrow} />
        </label>
        <input
          type={state.category === 'price' ? 'number' : 'text'}
          name="value"
          value={state.value}
          className={styles.input}
          placeholder={'Введите значение'}
          onChange={handleValueChange}
          min={state.category === 'price' ? 0 : undefined}
        />
        {!disabled && !!state.value && (
          <button onClick={handleReset} className={styles.deleteButton}>
            ×
          </button>
        )}
        <NavButton onClick={handleSubmit} disabled={disabled || !state.value}>
          <SearchIcon className={styles.search} />
        </NavButton>
      </div>
    </>
  );
});
