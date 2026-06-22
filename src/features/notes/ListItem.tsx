import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { NOTES_ROUTES } from "@/entities/notes/const";
import { useNotesStore } from "@/entities/notes/store";
import type { Note } from "@/entities/notes/types";
import DialogConfirm from "@/shared/ui/DialogConfirm";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";

interface NotesListItemProps {
  note: Note;
}

export default function NotesListItem({ note }: NotesListItemProps) {
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const navigate = useNavigate();
  const deleteNote = useNotesStore((state) => state.deleteNote);

  const handleDelete = async () => {
    await deleteNote(note.id);
    setDeleteOpen(false);
    navigate(NOTES_ROUTES.HOME);
  };

  return (
    <Card
      size="sm"
      className="gap-2 rounded-md py-3 shadow-none transition-colors hover:bg-muted/40"
      role="listitem"
    >
      <CardHeader className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2 px-3">
        <NavLink
          to={`/notes/${note.id}`}
          className="min-w-0 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <h3 className="truncate text-sm font-semibold">{note.title}</h3>
        </NavLink>

        <div className="flex items-center gap-0.5">
          <Button
            render={<NavLink to={`/notes/${note.id}/edit`} />}
            nativeButton={false}
            variant="ghost"
            size="icon-xs"
            aria-label={`Edit ${note.title}`}
            title="Edit note"
          >
            <PencilIcon />
          </Button>
          <DialogConfirm
            title={`Delete Note "${note.title}"`}
            triggerText={<Trash2Icon />}
            triggerButtonProps={{
              variant: "ghost",
              size: "icon-xs",
              "aria-label": `Delete ${note.title}`,
              title: "Delete note",
            }}
            buttonSubmitText="Delete"
            buttonCancelText="Cancel"
            open={isDeleteOpen}
            onOpenChange={setDeleteOpen}
            onConfirm={handleDelete}
          />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 px-3">
        <p className="line-clamp-2 min-h-10 text-xs leading-5 whitespace-pre-line text-muted-foreground">
          {note.content}
        </p>

        <div className="flex items-end justify-between gap-3">
          <div className="flex min-w-0 flex-wrap gap-1" aria-label="Note tags">
            {(note.tags ?? []).slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="max-w-24 truncate rounded-sm bg-muted px-1.5 py-0.5 text-[0.7rem] text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
          <time
            className="shrink-0 text-[0.7rem] text-muted-foreground"
            dateTime={note.updatedAt}
          >
            {formatNoteDate(note.updatedAt)}
          </time>
        </div>
      </CardContent>
    </Card>
  );
}

function formatNoteDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    month: "short",
  }).format(date);
}
