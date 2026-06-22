import { Button } from "@/components/ui/button";
import { NOTES_ROUTES } from "@/entities/notes/const";
import { useNotesStore } from "@/entities/notes/store";
import type { Note } from "@/entities/notes/types";
import { useNote } from "@/entities/notes/useNote";
import NotesEditor from "@/features/notes/Editor";
import { NoteLoadFallback } from "@/features/notes/LoadState";
import { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router";

export default function NoteItemEditPage() {
  const { id } = useParams<{ id: string }>();
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
      navigate(NOTES_ROUTES.HOME);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <NavLink to="/">
        <Button variant="outline">Back to Notes</Button>
      </NavLink>

      <div className="flex flex-col gap-4 max-h-screen">
        <h1>Note Item Edit Page</h1>

        <div className="overflow-auto">
          <NotesEditor
            model={noteState.note}
            isSubmitting={isSubmitting}
            onSubmit={handleUpdateNote}
          />
        </div>
      </div>
    </>
  );
}
