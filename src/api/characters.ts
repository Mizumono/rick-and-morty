import { fetchJson } from './client';
import type { Character, CharacterListResponse } from '../types';

export function fetchCharacters(
  page = 1,
  signal?: AbortSignal,
): Promise<CharacterListResponse> {
  return fetchJson<CharacterListResponse>(`/character?page=${page}`, signal);
}

export function fetchCharacterById(
  id: string,
  signal?: AbortSignal,
): Promise<Character> {
  return fetchJson<Character>(`/character/${id}`, signal);
}
