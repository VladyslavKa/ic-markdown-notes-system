import { Button } from "@/components/ui/button";
import { getNoteViewRoute, NOTES_ROUTES } from "@/entities/notes/const";
import { useNotesStore } from "@/entities/notes/store";
import type { Note } from "@/entities/notes/types";
import NotesEditor from "@/features/notes/Editor";
import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";

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
      <Button
        render={
          <NavLink
            to={{ pathname: NOTES_ROUTES.HOME, search: location.search }}
          />
        }
        nativeButton={false}
        variant="ghost"
        className="w-fit lg:hidden"
      >
        <ArrowLeftIcon data-icon="inline-start" />
        Notes
      </Button>

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
