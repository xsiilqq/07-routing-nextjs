import { notFound } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import css from './NotePreview.module.css';

interface NotePreviewProps {
  id: string;
}

export default async function NotePreview({ id }: NotePreviewProps) {
  try {
    const note = await fetchNoteById(id);

    return (
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}
