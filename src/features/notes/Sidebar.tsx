import { Button } from "@/components/ui/button";
import { NOTES_ROUTES } from "@/entities/notes/const";
import type { Note } from "@/entities/notes/types";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { NavLink, useLocation } from "react-router";
import NotesFilter from "./Filter";
import NotesList from "./List";
import NotesSearch from "./Search";

interface NotesSidebarProps {
  items: Note[];
  className?: string;
}

export default function NotesSidebar({ items, className }: NotesSidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "flex min-h-0 flex-col border-sidebar-border bg-sidebar text-sidebar-foreground lg:border-r",
        className,
      )}
    >
      <header className="border-b border-sidebar-border p-4">
        <div className="mb-4">
          <p className="text-base font-semibold">Markdown Notes</p>
          <p className="text-xs text-muted-foreground">{items.length} notes</p>
        </div>
        <NotesSearch />
      </header>

      <section className="flex min-h-0 flex-1 flex-col" aria-labelledby="notes-list-title">
        <div className="flex items-center justify-between px-4 py-3">
          <h1
            id="notes-list-title"
            className="text-xs font-semibold tracking-normal text-muted-foreground uppercase"
          >
            Notes
          </h1>
          <Button
            render={
              <NavLink
                to={{
                  pathname: NOTES_ROUTES.CREATE,
                  search: location.search,
                }}
              />
            }
            nativeButton={false}
            variant="ghost"
            size="icon-sm"
            aria-label="Create note"
            title="Create note"
          >
            <PlusIcon />
          </Button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-3">
          <NotesList items={items} />
        </div>
      </section>

      <footer className="border-t border-sidebar-border p-4">
        <NotesFilter />
      </footer>
    </aside>
  );
}
