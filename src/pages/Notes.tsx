import {
  NOTES_SEARCH_QUERY_NAME,
  NOTES_TAGS_QUERY_NAME,
} from "@/entities/notes/const";
import { useNotesStore } from "@/entities/notes/store";
import NotesFilter from "../features/notes/Filter";
import NotesList from "../features/notes/List";
import NotesSearch from "../features/notes/Search";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";

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
    <div>
      <NotesSearch />
      <NotesFilter />
      <NotesList items={items} />
    </div>
  );
}
