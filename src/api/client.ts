const BASE_URL = 'https://rickandmortyapi.com/api';

export async function fetchJson<T>(
  path: string,
  signal?: AbortSignal,
): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, { signal });

  if (!response.ok) {
    throw new Error(`Request to ${path} failed (status ${response.status})`);
  }

  return response.json();
}
