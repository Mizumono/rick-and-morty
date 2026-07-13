import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

function Pagination({
  currentPage,
  onPageChange,
  totalPages,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className={styles.pagination}>
      <button
        className={styles.control}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        type='button'
      >
        Previous
      </button>

      <p className={styles.status}>
        Page {currentPage} of {totalPages}
      </p>

      <button
        className={styles.control}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        type='button'
      >
        Next
      </button>
    </nav>
  );
}

export default Pagination;
