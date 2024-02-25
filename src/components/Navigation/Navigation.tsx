import * as React from 'react';
import clsx from 'clsx';

import styles from './Navigation.module.css';
import { NavButton } from '../NavButton/NavButton';
import { ReactElement } from 'react';

interface Props {
  page: number;
  pages: number;
  disabled?: boolean;
  onPageChange: (page: number) => void;
}

export const Navigation: React.FC<Props> = React.memo(({ page, onPageChange, pages, disabled = false }) => {
  const handlePageNumberClick = React.useCallback(
    (pageNumber: number) => () => {
      onPageChange(pageNumber);
    },
    [onPageChange]
  );

  const renderPageNumbers = () => {
    const pageNumbers: ReactElement[] = [];

    pageNumbers.push(
      <NavButton key="first" variant="outlined" onClick={handlePageNumberClick(1)} disabled={page === 1 || disabled}>
        <i className={`${styles.arrow} ${styles.left}`} />
        <i className={`${styles.arrow} ${styles.left}`} />
      </NavButton>,
      <NavButton
        variant="outlined"
        key="previous"
        onClick={handlePageNumberClick(page - 1)}
        disabled={page === 1 || disabled}
      >
        <i className={`${styles.arrow} ${styles.left}`} />
      </NavButton>
    );

    const count = Math.min(page + 2, pages);
    for (let i = Math.max(1, page - 2); i <= count; i++) {
      pageNumbers.push(
        page !== i ? (
          <NavButton variant="outlined" key={i} onClick={handlePageNumberClick(i)} disabled={disabled}>
            {i}
          </NavButton>
        ) : (
          <div key={i} className={styles.currentPage}>
            {i}
          </div>
        )
      );
    }

    pageNumbers.push(
      <NavButton
        variant="outlined"
        key="next"
        onClick={handlePageNumberClick(page + 1)}
        disabled={page === pages || disabled}
      >
        <i className={`${styles.arrow} ${styles.right}`} />
      </NavButton>,
      <NavButton
        key="last"
        variant="outlined"
        onClick={handlePageNumberClick(pages)}
        disabled={page === pages || disabled}
      >
        <i className={clsx(styles.arrow, styles.right)} />
        <i className={clsx(styles.arrow, styles.right)} />
      </NavButton>
    );

    return pageNumbers;
  };

  return <div className={styles.navigation}>{renderPageNumbers()}</div>;
});
