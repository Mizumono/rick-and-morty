import { Link } from 'react-router-dom';
import { useState } from 'react';
import { fetchCharacters } from '../../api/characters';
import { useFetch } from '../../hooks/useFetch';
import type { CharacterListResponse } from '../../types';
import Pagination from '../Pagination/Pagination';
import styles from './Home.module.css';

function Home() {
  const [currentPage, setCurrentPage] = useState(1);

	const { data, isLoading, error } = useFetch<CharacterListResponse>(
    (signal) => fetchCharacters(currentPage, signal),
    [currentPage],
	);

	if (isLoading) {
		return <h1>Loading...</h1>;
	}

	if (error) {
		console.error(error);
	}

  return (
    <section className='section'>
      <div className='container'>
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
              {data?.results.map((character) => (
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
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={data?.info.pages ?? 1}
        />
      </div>
    </section>
  );
}

export default Home;
