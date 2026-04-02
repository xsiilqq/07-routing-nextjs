import NotePreview from '@/components/NotePreview/NotePreview';
import css from './page.module.css';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params;
  return (
    <main className={css.main}>
      <NotePreview id={id} />
    </main>
  );
}
