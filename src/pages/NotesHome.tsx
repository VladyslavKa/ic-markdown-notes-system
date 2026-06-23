import { Button } from "@/components/ui/button";
import { NOTES_ROUTES } from "@/entities/notes/const";
import { useNotesStore } from "@/entities/notes/store";
import { NotebookPenIcon, PlusIcon } from "lucide-react";
import { NavLink, useLocation } from "react-router";

export default function NotesHomePage() {
  const itemsCount = useNotesStore((state) => state.items.length);
  const location = useLocation();

  return (
    <div className="flex max-w-sm flex-col items-center text-center">
      <div className="mb-5 flex size-12 items-center justify-center rounded-md border bg-muted/50 text-muted-foreground">
        <NotebookPenIcon className="size-5" aria-hidden="true" />
      </div>
      <h1 className="text-xl font-semibold">Your notes</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {itemsCount} notes in your workspace
      </p>
      <Button
        render={
          <NavLink
            to={{ pathname: NOTES_ROUTES.CREATE, search: location.search }}
          />
        }
        nativeButton={false}
        className="mt-5"
      >
        <PlusIcon data-icon="inline-start" />
        New note
      </Button>
    </div>
  );
}
