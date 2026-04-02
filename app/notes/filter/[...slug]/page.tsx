
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';
import { noteTags, type NoteTag } from '@/types/note';

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export default async function FilteredNotesPage({ params }: Props) {
  const { slug } = await params;

  if (slug && slug.length > 1) {
    notFound();
  }

  const rawTag = slug?.[0];

  let tag: NoteTag | undefined;

  if (!rawTag || rawTag === 'all') {
    tag = undefined;
  } else if (noteTags.includes(rawTag as NoteTag)) {
    tag = rawTag as NoteTag;
  } else {
    notFound();
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1, tag ?? 'all'],
    queryFn: () => fetchNotes('', 1, 12, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={tag} />
    </HydrationBoundary>
  );
}
