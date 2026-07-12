import { Link } from 'react-router-dom';
import { fetchCharacters } from '../api/characters';
import { useFetch } from '../hooks/useFetch';
import type { CharacterListResponse } from '../types';

function Home() {
	const { data, isLoading, error } = useFetch<CharacterListResponse>(
		(signal) => fetchCharacters(1, signal),
		[],
	);

	if (isLoading) {
		return <h1>Loading...</h1>;
	}

	if (error) {
		console.error(error);
	}

	return (
    <section className="section">
      <div className="container">
        <table>
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
                <td><img alt={character.name} loading="lazy" src={character.image}/></td>
                <td><Link to={`/profile/${character.id}`}>{character.name}</Link></td>
                <td>{character.species}</td>
                <td>{character.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Home;
