import type { Note } from "./types";
import { NOTES_TAGS_QUERY_NAME } from "./const";

export interface NoteFilters {
  search?: string;
  tags?: string[];
}

export function filterNotes(
  notes: Note[],
  { search = "", tags = [] }: NoteFilters = {},
): Note[] {
  const query = search.trim().toLowerCase();

  if (!query && tags.length === 0) return notes;

  return notes.filter((note) => {
    const matchesSearch =
      !query ||
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query);

    const matchesTags = tags.every((tag) =>
      (note.tags ?? []).includes(tag),
    );

    return matchesSearch && matchesTags;
  });
}

export function removeUnavailableTagFilters(
  searchParams: URLSearchParams,
  availableTags: string[],
) {
  const selectedTags = searchParams.getAll(NOTES_TAGS_QUERY_NAME);
  const validTags = selectedTags.filter((tag) => availableTags.includes(tag));

  if (validTags.length === selectedTags.length) return searchParams;

  const nextParams = new URLSearchParams(searchParams);

  nextParams.delete(NOTES_TAGS_QUERY_NAME);
  validTags.forEach((tag) => {
    nextParams.append(NOTES_TAGS_QUERY_NAME, tag);
  });

  return nextParams;
}
