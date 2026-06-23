import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  getNoteEditRoute,
  getNoteViewRoute,
  NOTES_ROUTES,
} from "@/entities/notes/const";
import { useNotesStore } from "@/entities/notes/store";
import type { Note } from "@/entities/notes/types";
import DialogConfirm from "@/shared/ui/DialogConfirm";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import NoteTags from "./NoteTags";
import NoteTime from "./NoteTime";

interface NotesListItemProps {
  note: Note;
}

export default function NotesListItem({ note }: NotesListItemProps) {
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const deleteNote = useNotesStore((state) => state.deleteNote);

  const handleDelete = async () => {
    await deleteNote(note.id);
    setDeleteOpen(false);

    const isDeletedNoteOpen =
      location.pathname === getNoteViewRoute(note.id) ||
      location.pathname === getNoteEditRoute(note.id);

    if (isDeletedNoteOpen) {
      navigate({ pathname: NOTES_ROUTES.HOME, search: location.search });
    }
  };

  return (
    <Card
      size="sm"
      className="relative gap-2 rounded-md py-3 shadow-none transition-colors hover:bg-muted/40 has-[a[aria-current=page]]:bg-muted/70"
      role="listitem"
    >
      <NavLink
        to={{ pathname: getNoteViewRoute(note.id), search: location.search }}
        className="absolute inset-0 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`Open ${note.title}`}
      />

      <CardHeader className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2 px-3">
        <div className="pointer-events-none min-w-0">
          <h3 className="truncate text-sm font-semibold">{note.title}</h3>
        </div>

        <div className="relative z-10 flex items-center gap-0.5">
          <Button
            render={
              <NavLink
                to={{
                  pathname: getNoteEditRoute(note.id),
                  search: location.search,
                }}
              />
            }
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

      <CardContent className="pointer-events-none flex flex-col gap-3 px-3">
        <p className="line-clamp-2 min-h-10 text-xs leading-5 whitespace-pre-line text-muted-foreground">
          {note.body}
        </p>

        <div className="flex items-end justify-between gap-3">
          <NoteTags tags={note.tags ?? []} compact limit={3} />
          <NoteTime
            value={note.updatedAt}
            className="shrink-0 text-[0.7rem]"
          />
        </div>
      </CardContent>
    </Card>
  );
}
