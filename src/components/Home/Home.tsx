import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCharacters } from '../../api/characters';
import { useFetch } from '../../hooks/useFetch';
import type { CharacterListResponse } from '../../types';
import Pagination from '../Pagination/Pagination';
import Search from '../Search/Search';
import styles from './Home.module.css';

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setCurrentPage(1);
      setDebouncedSearchTerm(searchTerm.trim());
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [searchTerm]);

  const { data, isLoading, error } = useFetch<CharacterListResponse>(
    (signal) => fetchCharacters(currentPage, debouncedSearchTerm, signal),
    [currentPage, debouncedSearchTerm],
  );

  const hasNoResults = Boolean(error?.includes('status 404'));
  const characters = data?.results ?? [];

  if (error && !hasNoResults) {
    console.error(error);
  }

  return (
    <section className='section'>
      <div className='container'>
        <Search onSearchChange={setSearchTerm} searchTerm={searchTerm} />
        <div className={styles.wrapper}>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Species</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && characters.length === 0 ? (
                <tr>
                  <td className={styles.emptyState} colSpan={4}>
                    Loading...
                  </td>
                </tr>
              ) : hasNoResults || characters.length === 0 ? (
                <tr>
                  <td className={styles.emptyState} colSpan={4}>
                    No characters found for "{searchTerm}".
                  </td>
                </tr>
              ) : (
                characters.map((character) => (
                  <tr key={character.id}>
                    <td>
                      <img
                        alt={character.name}
                        className={styles.avatar}
                        loading='lazy'
                        src={character.image}
                      />
                    </td>
                    <td>
                      <Link
                        className={styles.link}
                        to={`/profile/${character.id}`}
                      >
                        {character.name}
                      </Link>
                    </td>
                    <td>{character.species}</td>
                    <td>{character.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={hasNoResults ? 1 : (data?.info.pages ?? 1)}
        />
      </div>
    </section>
  );
}

export default Home;
