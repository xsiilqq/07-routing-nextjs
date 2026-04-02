import axios from 'axios';
import type { Note, NoteTag } from '@/types/note';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN?.trim();

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const fetchNotes = async (
  search = '',
  page = 1,
  perPage = 12,
  tag?: NoteTag
): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page, perPage };

  if (search) params.search = search;
  if (tag) params.tag = tag;

  const { data } = await api.get<FetchNotesResponse>('/notes', { params });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (noteData: {
  title: string;
  content: string;
  tag: NoteTag;
}): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', noteData);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};