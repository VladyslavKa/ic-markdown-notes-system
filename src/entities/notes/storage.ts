import { getDataByKey, setDataByKey } from "../../shared/lib/storage";
import type { Note } from "./types";

const NOTES_KEY = "ic_notes";

export async function createNote(note: Note) {
  let notes = await getNotes();

  if (notes) {
    notes.push(note);
  } else {
    notes = [note];
  }

  await setDataByKey<Note[]>(NOTES_KEY, notes);
}

export async function getNotes() {
  return getDataByKey<Note[]>(NOTES_KEY);
}

export async function getNoteById(id: string) {
  const notes = await getNotes();

  return notes?.find((note: Note) => note.id === id);
}

export async function updateNote(
  id: string,
  patch: Partial<Note>,
): Promise<Note | null> {
  const notes = await getNotes();

  if (!notes) return null;

  const currentNote = notes.find((note) => note.id === id);

  if (!currentNote) return null;

  const updatedNote = { ...currentNote, ...patch };
  const updatedNotes = notes.map((note) =>
    note.id === id ? updatedNote : note,
  );

  await setDataByKey<Note[]>(NOTES_KEY, updatedNotes);

  return updatedNote;
}

export async function deleteNote(id: string) {
  const notes = await getNotes();

  if (notes) {
    const updatedNotes = notes.filter((note: Note) => note.id !== id);

    await setDataByKey<Note[]>(NOTES_KEY, updatedNotes);
  }
}

export async function getNotesTags(): Promise<string[]> {
  const notes = (await getNotes()) ?? [];

  return [...new Set(notes.flatMap((note) => note.tags ?? []))].sort();
}
