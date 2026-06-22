import { NOTES_ROUTES } from "@/entities/notes/const";
import { useNotesStore } from "@/entities/notes/store";
import type { Note } from "@/entities/notes/types";
import NotesEditor from "@/features/notes/Editor";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function NoteItemCreatePage() {
  const navigate = useNavigate();
  const createNote = useNotesStore((state) => state.createNote);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialNote = {
    id: crypto.randomUUID(),
    title: "",
    content: "",
    tags: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const handleCreateNote = async (note: Note) => {
    try {
      setIsSubmitting(true);
      await createNote(note);
      navigate(NOTES_ROUTES.HOME);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-h-screen">
      <h1>Note Item Create Page</h1>

      <div className="overflow-auto">
        <NotesEditor
          model={initialNote}
          isSubmitting={isSubmitting}
          onSubmit={handleCreateNote}
        />
      </div>
    </div>
  );
}
