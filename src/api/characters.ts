import { fetchJson } from './client';
import type { Character, CharacterListResponse } from '../types';

export function fetchCharacters(
  page = 1,
  name = '',
  signal?: AbortSignal,
): Promise<CharacterListResponse> {
  const query = new URLSearchParams({ page: String(page) });

  if (name.trim()) {
    query.set('name', name.trim());
  }

  return fetchJson<CharacterListResponse>(
    `/character?${query.toString()}`,
    signal,
  );
}

export function fetchCharacterById(
  id: string,
  signal?: AbortSignal,
): Promise<Character> {
  return fetchJson<Character>(`/character/${id}`, signal);
}
