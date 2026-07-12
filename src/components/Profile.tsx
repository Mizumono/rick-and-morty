import { Link, useParams } from 'react-router-dom';
import { fetchCharacterById } from '../api/characters';
import { useFetch } from '../hooks/useFetch';
import type { Character } from '../types';

function Profile() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useFetch<Character>(
    (signal) => fetchCharacterById(id ?? '', signal),
    [id],
  );

  if (!id) {
    return <h1>Profile not found.</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    console.error(error);
  }

  return (
    <section>
      <h1>Profile</h1>
      <img alt={data?.name} loading="lazy" src={data?.image} />
      <p>
        <strong>Name:</strong> {data?.name}
      </p>
      <p>
        <strong>Species:</strong> {data?.species}
      </p>
      <p>
        <strong>Status:</strong> {data?.status}
      </p>
      <p>
        <Link to="/">Back to Home</Link>
      </p>
    </section>
  );
}

export default Profile;