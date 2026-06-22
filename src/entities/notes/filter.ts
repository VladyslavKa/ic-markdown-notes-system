import type { Note } from "./types";

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
