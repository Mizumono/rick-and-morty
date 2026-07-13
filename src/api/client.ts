const BASE_URL = 'https://rickandmortyapi.com/api';

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function fetchJson<T>(
  path: string,
  signal?: AbortSignal,
): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, { signal });

  if (!response.ok) {
    throw new ApiError(
      `Request to ${path} failed (status ${response.status})`,
      response.status,
    );
  }

  return response.json();
}
