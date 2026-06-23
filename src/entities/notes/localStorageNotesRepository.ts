import { getDataByKey, setDataByKey } from "@/shared/lib/storage";
import type { NotesRepository } from "./repository";
import type { Note } from "./types";

const NOTES_KEY = "ic_notes";

type StoredNote = Omit<Note, "body"> & {
  body?: string;
  content?: string;
};

async function getNotes() {
  const storedNotes = (await getDataByKey<StoredNote[]>(NOTES_KEY)) ?? [];
  const hasLegacyNotes = storedNotes.some(
    (note) => note.body === undefined && note.content !== undefined,
  );
  const notes = storedNotes.map(({ content, ...note }) => ({
    ...note,
    body: note.body ?? content ?? "",
  }));

  if (hasLegacyNotes) {
    await setDataByKey<Note[]>(NOTES_KEY, notes);
  }

  return notes;
}

export const localStorageNotesRepository: NotesRepository = {
  getAll: getNotes,

  getById: async (id) => {
    const notes = await getNotes();

    return notes.find((note) => note.id === id);
  },

  create: async (note) => {
    const notes = await getNotes();

    await setDataByKey<Note[]>(NOTES_KEY, [...notes, note]);
  },

  update: async (id, patch) => {
    const notes = await getNotes();
    const currentNote = notes.find((note) => note.id === id);

    if (!currentNote) return null;

    const updatedNote = {
      ...currentNote,
      ...patch,
      updatedAt: new Date().toISOString(),
    };
    const updatedNotes = notes.map((note) =>
      note.id === id ? updatedNote : note,
    );

    await setDataByKey<Note[]>(NOTES_KEY, updatedNotes);

    return updatedNote;
  },

  delete: async (id) => {
    const notes = await getNotes();

    await setDataByKey<Note[]>(
      NOTES_KEY,
      notes.filter((note) => note.id !== id),
    );
  },

  getTags: async () => {
    const notes = await getNotes();

    return [...new Set(notes.flatMap((note) => note.tags ?? []))].sort();
  },
};
