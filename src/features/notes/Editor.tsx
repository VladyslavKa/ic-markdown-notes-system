import { useState } from "react";
import NoteEditorForm from "./EditorForm";
import NotePreview from "./Preview";
import type { Note } from "@/entities/notes/types";

interface NotesEditorProps {
  model: Note;
  isSubmitting?: boolean;
  onSubmit: (note: Note) => void;
}

export default function NotesEditor({
  model,
  isSubmitting,
  onSubmit,
}: NotesEditorProps) {
  const [note, setNote] = useState<Note>(model);

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <div>
        <NoteEditorForm
          model={note}
          isSubmitting={isSubmitting}
          onChange={setNote}
          onSubmit={onSubmit}
        />
      </div>
      <NotePreview note={note} />
    </div>
  );
}
