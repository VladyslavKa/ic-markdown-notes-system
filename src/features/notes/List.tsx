import type { Note } from "@/entities/notes/types";
import NotesListItem from "./ListItem";
import { FileTextIcon } from "lucide-react";

interface NotesListProps {
  items: Note[];
}

export default function NotesList({ items }: NotesListProps) {
  if (items.length === 0) {
    return <NotesListEmpty />;
  }

  return (
    <div className="flex flex-col gap-2" role="list">
      {items.map((item) => (
        <NotesListItem key={item.id} note={item} />
      ))}
    </div>
  );
}

function NotesListEmpty() {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center gap-3 px-6 text-center">
      <div className="flex size-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
        <FileTextIcon className="size-4" aria-hidden="true" />
      </div>
      <p className="text-sm font-medium">No notes found</p>
    </div>
  );
}
