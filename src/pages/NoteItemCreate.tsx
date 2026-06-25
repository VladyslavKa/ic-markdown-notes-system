import { getNoteViewRoute } from "@/entities/notes/const";
import { useNotesStore } from "@/entities/notes/store";
import type { Note } from "@/entities/notes/types";
import NotesBackButton from "@/features/notes/BackButton";
import NotesEditor from "@/features/notes/Editor";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

export default function NoteItemCreatePage() {
  const navigate = useNavigate();
  const location = useLocation();
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

      <h1 className="text-xl font-semibold">Create note</h1>

      <div className="min-h-0">
        <NotesEditor
          model={initialNote}
          isSubmitting={isSubmitting}
          onSubmit={handleCreateNote}
        />
      </div>
    </div>
  );
}
