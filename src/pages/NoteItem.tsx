import { useNote } from "@/entities/notes/useNote";
import NotesBackButton from "@/features/notes/BackButton";
import { NoteLoadFallback } from "@/features/notes/LoadState";
import NotePreview from "@/features/notes/Preview";
import { useParams } from "react-router";

export default function NoteItemPage() {
  const { id } = useParams<{ id: string }>();
  const noteState = useNote(id);

  if (noteState.status !== "success") {
    return <NoteLoadFallback status={noteState.status} />;
  }

  return (
    <div className="flex min-h-full flex-col gap-4 p-4 sm:p-6">
      <NotesBackButton />

      <NotePreview note={noteState.note} />
    </div>
  );
}
