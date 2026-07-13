import { Link, useParams } from 'react-router-dom';
import { ApiError } from '../../api/client';
import { fetchCharacterById } from '../../api/characters';
import { useFetch } from '../../hooks/useFetch';
import type { Character } from '../../types';
import styles from './Profile.module.css';

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
    const isNotFound = error instanceof ApiError && error.status === 404;

    return (
      <section className="section">
        <div className="container">
          <div className={styles.wrapper}>
            <h1 className={styles.name}>
              {isNotFound ? 'Character not found.' : 'Something went wrong. Please try again.'}
            </h1>
            <Link className={styles.link} to="/">Back to Home</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.hero}>
            <img alt={data?.name} className={styles.avatar} loading="lazy" src={data?.image} />
            <h1 className={styles.name}>{data?.name}</h1>
            <p className={styles.subtitle}>{data?.species} · {data?.status}</p>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.label}>Gender</span>
              <span className={styles.value}>{data?.gender}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.label}>Origin</span>
              <span className={styles.value}>{data?.origin.name}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.label}>Location</span>
              <span className={styles.value}>{data?.location.name}</span>
            </div>
          </div>

          <div className={styles.details}>
            <h2 className={styles.detailsTitle}>Character Details</h2>
            <div className={styles.detailsGrid}>
              <p className={styles.detailsItem}>
                <strong>Species:</strong> {data?.species}
              </p>
              <p className={styles.detailsItem}>
                <strong>Status:</strong> {data?.status}
              </p>
              <p className={styles.detailsItem}>
                <strong>Type:</strong> {data?.type || 'Unknown'}
              </p>
              <p className={styles.detailsItem}>
                <strong>Episodes:</strong> {data?.episode.length}
              </p>
            </div>
          </div>

          <Link className={styles.link} to="/">Back to Home</Link>
        </div>
      </div>
    </section>
  );
}

export default Profile;