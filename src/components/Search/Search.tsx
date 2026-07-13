import styles from './Search.module.css';

interface SearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

function Search({ searchTerm, onSearchChange }: SearchProps) {
  return (
    <div className={styles.searchRow}>
      <label className={styles.searchLabel} htmlFor='character-search'>
        Search by name
      </label>
      <input
        className={styles.searchInput}
        id='character-search'
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder='e.g. Rick'
        type='text'
        value={searchTerm}
      />
    </div>
  );
}

export default Search;
