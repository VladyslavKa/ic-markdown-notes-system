import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { NOTES_ROUTES } from "@/entities/notes/const";
import { useNotesStore } from "@/entities/notes/store";
import type { Note } from "@/entities/notes/types";
import DialogConfirm from "@/shared/ui/DialogConfirm";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";

interface NotesListItemProps {
  note: Note;
}

export default function NotesListItem({ note }: NotesListItemProps) {
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const navigate = useNavigate();
  const deleteNote = useNotesStore((state) => state.deleteNote);

  const handleDelete = () => {
    deleteNote(note.id);
    setDeleteOpen(false);
    navigate(NOTES_ROUTES.HOME);
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">{note.title}</h3>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <time className="text-xs text-muted-foreground" dateTime={note.createdAt}>
            {note.createdAt}
          </time>

          {(note.tags ?? []).length > 0 && (
            <div className="flex flex-wrap gap-1.5" aria-label="Note tags">
              {(note.tags ?? []).map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <CardAction>
          <NavLink to={`/notes/${note.id}`}>
            <Button variant="outline">View</Button>
          </NavLink>
        </CardAction>
        <CardAction>
          <NavLink to={`/notes/${note.id}/edit`}>
            <Button variant="outline">Edit</Button>
          </NavLink>
        </CardAction>
        <CardAction>
          <DialogConfirm
            title={`Delete Note "${note.title}"`}
            triggerText={"Delete"}
            buttonSubmitText="Delete"
            buttonCancelText="Cancel"
            open={isDeleteOpen}
            onOpenChange={setDeleteOpen}
            onConfirm={handleDelete}
          />
        </CardAction>
      </CardFooter>
    </Card>
  );
}
