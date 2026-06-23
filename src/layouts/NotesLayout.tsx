import {
  NOTES_ROUTES,
  NOTES_SEARCH_QUERY_NAME,
  NOTES_TAGS_QUERY_NAME,
} from "@/entities/notes/const";
import { filterNotes } from "@/entities/notes/filter";
import { useNotesStore } from "@/entities/notes/store";
import NotesSidebar from "@/features/notes/Sidebar";
import { cn } from "@/lib/utils";
import { useEffect, useMemo } from "react";
import { Outlet, useLocation, useSearchParams } from "react-router";

export default function NotesLayout() {
  const items = useNotesStore((state) => state.items);
  const loadNotes = useNotesStore((state) => state.loadNotes);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isNotesHome = location.pathname === NOTES_ROUTES.HOME;
  const search = searchParams.get(NOTES_SEARCH_QUERY_NAME) ?? "";
  const selectedTags = useMemo(
    () => searchParams.getAll(NOTES_TAGS_QUERY_NAME),
    [searchParams],
  );
  const filteredItems = useMemo(
    () => filterNotes(items, { search, tags: selectedTags }),
    [items, search, selectedTags],
  );

  useEffect(() => {
    void loadNotes();
  }, [loadNotes]);

  return (
    <div className="min-h-svh bg-muted/30 p-0 sm:p-4 lg:p-6">
      <div className="mx-auto grid min-h-svh max-w-7xl overflow-hidden border bg-background shadow-sm sm:min-h-[calc(100svh-2rem)] sm:rounded-md lg:h-[calc(100svh-3rem)] lg:min-h-0 lg:grid-cols-[22rem_minmax(0,1fr)]">
        <NotesSidebar
          items={filteredItems}
          className={cn(!isNotesHome && "hidden lg:flex")}
        />

        <main
          className={cn(
            "relative min-w-0 overflow-y-auto",
            isNotesHome
              ? "hidden items-center justify-center p-10 lg:flex"
              : "block",
          )}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
