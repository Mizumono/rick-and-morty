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
  const safeTotalPages = Math.max(1, totalPages);
  const safeCurrentPage = Math.min(Math.max(1, currentPage), safeTotalPages);

  return (
    <nav className={styles.pagination}>
      <button
        className={styles.control}
        disabled={safeCurrentPage === 1}
        onClick={() => onPageChange(safeCurrentPage - 1)}
        type='button'
      >
        Previous
      </button>

      <p className={styles.status}>
        Page {safeCurrentPage} of {safeTotalPages}
      </p>

      <button
        className={styles.control}
        disabled={safeCurrentPage === safeTotalPages}
        onClick={() => onPageChange(safeCurrentPage + 1)}
        type='button'
      >
        Next
      </button>
    </nav>
  );
}

export default Pagination;
