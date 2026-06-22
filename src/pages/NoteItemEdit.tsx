import { getNoteViewRoute } from "@/entities/notes/const";
import { useNotesStore } from "@/entities/notes/store";
import type { Note } from "@/entities/notes/types";
import { useNote } from "@/entities/notes/useNote";
import NotesBackButton from "@/features/notes/BackButton";
import NotesEditor from "@/features/notes/Editor";
import { NoteLoadFallback } from "@/features/notes/LoadState";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

export default function NoteItemEditPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const updateNote = useNotesStore((state) => state.updateNote);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const noteState = useNote(id);

  if (noteState.status !== "success") {
    return <NoteLoadFallback status={noteState.status} />;
  }

  const handleUpdateNote = async (note: Note) => {
    try {
      setIsSubmitting(true);
      await updateNote(note);
      navigate({
        pathname: getNoteViewRoute(note.id),
        search: location.search,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col gap-4 p-4 sm:p-6">
      <NotesBackButton />

      <div className="flex min-h-0 flex-col gap-4">
        <h1 className="text-xl font-semibold">Edit note</h1>

        <div className="min-h-0">
          <NotesEditor
            model={noteState.note}
            isSubmitting={isSubmitting}
            onSubmit={handleUpdateNote}
          />
        </div>
      </div>
    </div>
  );
}
