import {
  NOTES_SEARCH_QUERY_NAME,
  NOTES_TAGS_QUERY_NAME,
} from "@/entities/notes/const";
import { useNotesStore } from "@/entities/notes/store";
import { Button } from "@/components/ui/button";
import { NOTES_ROUTES } from "@/entities/notes/const";
import NotesSidebar from "@/features/notes/Sidebar";
import { NotebookPenIcon, PlusIcon } from "lucide-react";
import { useEffect, useMemo } from "react";
import { NavLink, useSearchParams } from "react-router";

export default function NotesPage() {
  const items = useNotesStore((state) => state.items);
  const getItems = useNotesStore((state) => state.getItems);
  const [searchParams] = useSearchParams();
  const search = searchParams.get(NOTES_SEARCH_QUERY_NAME) ?? "";
  const selectedTags = useMemo(
    () => searchParams.getAll(NOTES_TAGS_QUERY_NAME),
    [searchParams],
  );

  useEffect(() => {
    void getItems({ search, tags: selectedTags });
  }, [getItems, search, selectedTags]);

  return (
    <div className="min-h-svh bg-muted/30 p-0 sm:p-4 lg:p-6">
      <div className="mx-auto grid min-h-svh max-w-7xl overflow-hidden border bg-background shadow-sm sm:min-h-[calc(100svh-2rem)] sm:rounded-md lg:h-[calc(100svh-3rem)] lg:min-h-0 lg:grid-cols-[22rem_minmax(0,1fr)]">
        <NotesSidebar items={items} />

        <main className="relative hidden min-w-0 items-center justify-center p-10 lg:flex">
          <div className="flex max-w-sm flex-col items-center text-center">
            <div className="mb-5 flex size-12 items-center justify-center rounded-md border bg-muted/50 text-muted-foreground">
              <NotebookPenIcon className="size-5" aria-hidden="true" />
            </div>
            <h2 className="text-xl font-semibold">Your notes</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {items.length} notes in your workspace
            </p>
            <Button
              render={<NavLink to={NOTES_ROUTES.CREATE} />}
              nativeButton={false}
              className="mt-5"
            >
              <PlusIcon data-icon="inline-start" />
              New note
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
